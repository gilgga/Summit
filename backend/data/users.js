const httpCodes = require('http-codes')

const bcrypt = require('bcrypt');


const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const topics = mongoCollections.topics;
const courses = mongoCollections.courses;

const saltRounds = 16;

// Schema-Inspector Schemas
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

    const sanitizedNewUserInput = inspector.sanitize( userSanitizationSchema, newUserInput );
    const validatedNewUserInput = inspector.validate( userValidationSchema, sanitizedNewUserInput );

    if ( !validatedNewUserInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewUserInput.format()
        };
    }
    
    const usersCollection = await users();

    let checkEmail = await usersCollection.findOne({email: validatedNewUserInput.email});
    if (checkEmail) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "Account with email already exists"
        }; 
    }

    let insertData = await usersCollection.insertOne(validatedNewUserInput);
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
    if (!email || !email.trim()) {
        throw "Email required";
    }
    email = email.trim()
    if (!password || !password.trim()) {
        throw "Password required";
    }
    console.log(email, password)
    const usersCollection = await users();
    const getUser = await usersCollection.findOne({email: email});

    if (!getUser) {
        throw "User not found";
    }
    let match = await bcrypt.compare(password, getUser.password);
    if (!match) {
        throw "User not found";
    }
    delete getUser.password;
    return getUser;
}

async function enrollCourse(userid, courseid, adding) {
    if (!userid) {
        throw "User id required";
    }
    userid = ObjectId(userid);
    if (!courseid) {
        throw "Course id required";
    }
    courseid = ObjectId(courseid);

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({_id: userid})
    if (!checkExisting) {
        throw "User does not exist";
    }
    const courseCollection = await courses();
    checkExisting = await courseCollection.findOne({_id: courseid});
    if (!checkExisting) {
        throw "Course does not exist";
    }


    if (adding) {
        const addToUser = await usersCollection.updateOne(
            {_id: userid}, 
            {$push : {courses : courseid}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
        const addToTopic = await courseCollection.updateOne(
            {_id: courseid}, 
            {$push : {usersEnrolled : userid}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }    
    } else {
        const addToUser = await usersCollection.updateOne(
            {_id: userid}, 
            {$pull : {courses : courseid}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
        const addToTopic = await courseCollection.updateOne(
            {_id: courseid}, 
            {$pull : {usersEnrolled : userid}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
    }

    checkExisting = await usersCollection.findOne({_id: userid})
    delete checkExisting["password"];
    return checkExisting;
}

async function enrollTopic(userid, topicid, adding) {
    if (!userid) {
        throw "User id required";
    }
    userid = ObjectId(userid.toString());
    if (!topicid) {
        throw "Course id required";
    }
    topicid = ObjectId(topicid.toString());

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({_id: userid})
    if (!checkExisting) {
        throw "User does not exist";
    }
    const topicCollection = await topics();
    checkExisting = await topicCollection.findOne({_id: topicid});
    if (!checkExisting) {
        throw "Course does not exist";
    }

    if (adding) {
        const addToUser = await usersCollection.updateOne(
            {_id: userid}, 
            {$push : {topics : topicid}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
        const addToTopic = await topicCollection.updateOne(
            {_id: topicid}, 
            {$push : {usersEnrolled : userid}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
    } else {
        const addToUser = await usersCollection.updateOne(
            {_id: userid}, 
            {$pull : {topics : topicid}},
            );
        
        if (addToUser.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }
    
        const addToTopic = await topicCollection.updateOne(
            {_id: topicid}, 
            {$pull : {usersEnrolled : userid}},
            );
        
        if (addToTopic.modifiedCount != 1) {
                throw "Could not update user's courses array";
        }    
    }
    checkExisting = await usersCollection.findOne({_id: userid})
    delete checkExisting["password"];
    return checkExisting;
}

module.exports = {
    createUser,
    loginUser,
    enrollCourse,
    enrollTopic
}