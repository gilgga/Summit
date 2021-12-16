const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const { addImage, getUserImage } = require('./image');
const users = mongoCollections.users;
const topics = mongoCollections.topics;
const courses = mongoCollections.courses;

const saltRounds = 16;

async function createUser(email, password, firstName, lastName) {

    if (!email || !email.trim()) {
        throw "Email required";
    }
    if (!password || !password.trim()) {
        throw "password required";
    }
    if (!firstName || !firstName.trim()) {
        throw "firstName required";
    }
    if (!lastName || !lastName.trim()) {
        throw "lastName required";
    }
    const usersCollection = await users();

    let checkEmail = await usersCollection.findOne({email: email.trim()});
    if (checkEmail) {
        throw "Account with email already exists";
    }

    const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);
    
    user = {
        email: email.trim(),
        password: hashedPassword,
        firstName: firstName.trim(),
        description: "",
        lastName: lastName.trim(),
        topics: [],
        courses: []
    }
    let insertData = await usersCollection.insertOne(user);
    let newId = insertData.insertedId;
    if (!newId) {
        throw "Error adding user";
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
    const userImage = await getUserImage(userid);
    getUser.image = userImage;
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

module.exports = {
    createUser,
    loginUser,
    enrollCourse,
    enrollTopic,
    editProfile
}