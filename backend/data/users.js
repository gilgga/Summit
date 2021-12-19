const httpCodes = require('http-codes')

const bcrypt = require('bcrypt');
const saltRounds = 16;

const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const { addImage, getUserImage } = require('./image');
const users = mongoCollections.users;
const topics = mongoCollections.topics;
const courses = mongoCollections.courses;

const courseData = require('./courses');
const topicData = require('./topics');

const errorChecking = require('./errors');

// Schema-Inspector Schemas
const inspector = require('schema-inspector');

const userSanitizationSchema = {
    type: "object",
    strict: true,
    properties: {
        email: {
            type: "string",
            optional: false,
            rules: ["trim", "lower"],
            minLength: 1
        },
        password: {
            type: "string",
            optional: false,
            rules: ["trim"],
            minLength: 1
        },
        description: {
            type: "string"
        },
        firstName: {
            type: "string",
            optional: false,
            rules: ["trim", "capitalize"],
            minLength: 1
        },
        lastName: {
            type: "string",
            optional: false,
            rules: ["trim", "capitalize"],
            minLength: 1
        },
        topics: {
            type: "array"
        },
        courses: {
            type: "array"
        }
    }
};
const userValidationSchema = {
    type: "object",
    strict: true,
    properties: {
        email: {
            type: "string",
            optional: false,
            pattern: "email"
        },
        password: {
            type: "string",
            optional: false
        },
        description: {
            type: "string"
        },
        firstName: {
            type: "string",
            optional: false,
            minLength: 1
        },
        lastName: {
            type: "string",
            optional: false, 
            minLength: 1
        },
        topics: {
            type: "array",
            uniqueness: true
        },
        courses: {
            type: "array",
            uniqueness: true
        }
    }
};

const loginSanitizationSchema = {
    type: "object",
    strict: true,
    properties: {
        email: {
            type: "string",
            optional: false,
            rules: ["trim", "lower"],
            minLength: 1
        },
        password: {
            type: "string",
            optional: false,
            rules: ["trim"],
            minLength: 1
        }
    }
};
const loginValidationSchema = {
    type: "object",
    strict: true,
    properties: {
        email: {
            type: "string",
            optional: false,
            pattern: "email"
        },
        password: {
            type: "string",
            optional: false
        }
    }
};

async function createUser(email, password, firstName, lastName) {
    const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);
    
    let newUserInput = {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        description: "",
        lastName: lastName,
        topics: [],
        courses: []
    }

    inspector.sanitize( userSanitizationSchema, newUserInput );
    const validatedNewUserInput = inspector.validate( userValidationSchema, newUserInput );

    if ( !validatedNewUserInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewUserInput.format()
        };
    }
    
    const usersCollection = await users();

    let checkEmail = await usersCollection.findOne({email: newUserInput.email});
    if (checkEmail) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "Account with email already exists"
        }; 
    }

    let insertData = await usersCollection.insertOne(newUserInput);
    let newId = insertData.insertedId;
    if (!newId) {
        throw {
            status: httpCodes.INTERNAL_SERVER_ERROR,
            message: "Error adding user"
        }
    }
    let newUser = await usersCollection.findOne({_id: newId});
    delete newUser.password;

    return newUser;
}

async function loginUser(email, password) {
    let loginUserInput = {
        email: email,
        password: password
    }
    
    inspector.sanitize( loginSanitizationSchema, loginUserInput );
    const validatedLoginUserInput = inspector.validate( loginValidationSchema, loginUserInput );

    if ( !validatedLoginUserInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedLoginUserInput.format()
        };
    }

    const usersCollection = await users();
    const getUser = await usersCollection.findOne({email: loginUserInput.email});

    if (!getUser) {
        throw {
            status: httpCodes.UNAUTHORIZED,
            message: "User not found"
        }
    }
    let match = await bcrypt.compare(loginUserInput.password, getUser.password);
    if (!match) {
        throw {
            status: httpCodes.UNAUTHORIZED,
            message: "User not found"
        }
    }
    const userImage = await getUserImage(getUser._id);
    getUser.image = userImage;
    delete getUser.password;
    return getUser;
}

async function enrollCourse(userid, courseid, adding) {
    const sanitizedUserId = errorChecking.sanitizeId( userid );
    const sanitizedCourseId = errorChecking.sanitizeId( courseid ); 

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({_id: sanitizedUserId})
    if (!checkExisting) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "User does not exist"
        }
    }
    const courseCollection = await courses();
    checkExisting = await courseCollection.findOne({_id: sanitizedCourseId});
    if (!checkExisting) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Course does not exist"
        }
    }

    if (adding) {
        const addToUser = await usersCollection.updateOne(
            {_id: sanitizedUserId}, 
            {$push : {courses : sanitizedCourseId}},
            );
        
        if (addToUser.modifiedCount != 1) {
            throw {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Could not update user's courses array"
            }
        }
    
        const addToTopic = await courseCollection.updateOne(
            {_id: sanitizedCourseId}, 
            {$push : {usersEnrolled : sanitizedUserId}},
            );
        
        if (addToTopic.modifiedCount != 1) {
            throw {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Could not update user's courses array"
            }
        }    
    } else {
        const addToUser = await usersCollection.updateOne(
            {_id: sanitizedUserId}, 
            {$pull : {courses : sanitizedCourseId}},
            );
        
        if (addToUser.modifiedCount != 1) {
            throw {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Could not update user's courses array"
            }
        }
    
        const addToTopic = await courseCollection.updateOne(
            {_id: sanitizedCourseId}, 
            {$pull : {usersEnrolled : sanitizedUserId}},
            );
        
        if (addToTopic.modifiedCount != 1) {
            throw {
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: "Could not update user's courses array"
            }
        }
    
    }

    checkExisting = await usersCollection.findOne({_id: sanitizedUserId})
    delete checkExisting["password"];
    return checkExisting;
}

async function enrollTopic(userid, topicid, adding) {
    const sanitizedUserId = errorChecking.sanitizeId( userid.toString() );
    const sanitizedTopicId = errorChecking.sanitizeId( topicid.toString() )

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({_id: sanitizedUserId})
    if (!checkExisting) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "User does not exist"
        }
    }
    const topicCollection = await topics();
    checkExisting = await topicCollection.findOne({_id: sanitizedTopicId});
    if (!checkExisting) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "Course does not exist"
        }
    }

    if (adding) {
        const addToUser = await usersCollection.updateOne(
            {_id: sanitizedUserId}, 
            {$push : {topics : sanitizedTopicId}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw {
                    status: httpCodes.INTERNAL_SERVER_ERROR,
                    message: "Could not update user's topics array"
                }
        }
    
        const addToTopic = await topicCollection.updateOne(
            {_id: sanitizedTopicId}, 
            {$push : {usersEnrolled : sanitizedUserId}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw {
                    status: httpCodes.INTERNAL_SERVER_ERROR,
                    message: "Could not update user's topics array"
                }
        }
    
    } else {
        const addToUser = await usersCollection.updateOne(
            {_id: sanitizedUserId}, 
            {$pull : {topics : sanitizedTopicId}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw {
                    status: httpCodes.INTERNAL_SERVER_ERROR,
                    message: "Could not update user's topics array"
                }
        }
    
        const addToTopic = await topicCollection.updateOne(
            {_id: sanitizedTopicId}, 
            {$pull : {usersEnrolled : sanitizedUserId}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw {
                    status: httpCodes.INTERNAL_SERVER_ERROR,
                    message: "Could not update user's topics array"
                }
        }    
    }
    checkExisting = await usersCollection.findOne({_id: sanitizedUserId})
    delete checkExisting["password"];
    return checkExisting;
}

async function editDescription(id, description) {
    if (!id) {
        throw "userid required";
    }
    id = ObjectId(id);

    if (!description || !description.trim()) {
        throw "New description required"
    }
    description = description.trim();

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({_id: id})
    if (!checkExisting) {
        throw "User does not exist";
    }
    let newDescription = await usersCollection.updateOne(
        {_id: id},
        {$set: {
            description: description
        }}
    );

    if (newDescription.modifiedCount != 1) {
        throw "Could not change user's description";
    }
    checkExisting = await usersCollection.findOne({_id: id});
    delete checkExisting["password"];
    return checkExisting;
}

async function editProfile(id, description, image) {
    if (!id) {
        throw "userid not provided";
    }
    let user;
    if (description) {
        user = await editDescription(id, description);
    } else {
        id = ObjectId(id);
        const usersCollection = await users();
        user = await usersCollection.findOne({_id: id})
        if (!user) {
            throw "User does not exist";
        }        
    }
    if (image) {
        let uploadedImage = await addImage(id, image);
        user.image = uploadedImage;            
    }
    return user;
}

async function getUser(id) {
    if (!id) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    id = errorChecking.sanitizeId( id );

    const allUsers = await users();
    
    const user = await allUsers.findOne({_id: id});
    if (!user) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "User not found"
        }
    }
    return user;

}

async function getUserCourseDetails(id) {
    if (!id) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    id = errorChecking.sanitizeId( id );

    const allUsers = await users();
    
    const user = await allUsers.findOne({_id: id});
    if (!user) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "User not found"
        }
    }
    
    const promises = user['courses'].map( async (cid) => {
        return await courseData.getCourse(cid);
    });

    return await Promise.all(promises);
}

async function getUserTopicDetails(id) {
    if (!id) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    id = errorChecking.sanitizeId( id );

    const allUsers = await users();
    
    const user = await allUsers.findOne({_id: id});
    if (!user) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "User not found"
        }
    }
    
    const promises = user['topics'].map( async (tid) => {
        return await topicData.getTopic(tid);
    });

    return await Promise.all(promises);
}


module.exports = {
    createUser,
    loginUser,
    enrollCourse,
    enrollTopic,
    editProfile,
    getUser,
    getUserCourseDetails,
    getUserTopicDetails
}