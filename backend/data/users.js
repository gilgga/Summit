const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const topics = mongoCollections.topics;
const courses = mongoCollections.topics;

const saltRounds = 16;

async function createUser(email, password, firstName, lastName) {
    let invalidCreds = false;
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
        lastName: lastName.trim(),
        topics: [],
        courses: []
    }
    let insertData = await usersCollection.insertOne(user);
    let newId = insertData.insertedId;
    if (!newId) {
        console.log(insertData);
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
    if (!password || !password.trim()) {
        throw "Password required";
    }
    const usersCollection = await users();
    const getUser = await usersCollection.findOne({email: email.trim()});
    if (!getUser) {
        throw "User not found";
    }
    let match = await bcrypt.compare(password.trim(), getUser.password);
    if (!match) {
        throw "User not found";
    }
    delete match.password;
    return match;
}

async function enrollCourse(username, coursename) {
    if (!username) {
        throw "User id required";
    }
    if (!coursename) {
        throw "Course id required";
    }

    const usersCollection = await users();
    let checkExisting = await usersCollection.findOne({email: username})
    if (!checkExisting) {
        throw "User does not exist";
    }
    const coursesCollection = await courses();
    console.log(coursename)
    checkExisting = await coursesCollection.findOne({title: coursename});
    if (!checkExisting) {
        throw "Course does not exist";
    }

    const addToUser = await usersCollection.updateOne(
        {email: username}, 
        {$push : {courses : coursename}},
        );
    
    if (addToUser.modifiedCount != 1) {
            throw "Could not update user's courses array";
    }

    const addToTopic = await topicCollection.updateOne(
        {title: coursename},
        {$push : {usersEnrolled : username}},
        );
    
    if (addToTopic.modifiedCount != 1) {
            throw "Could not update user's courses array";
    }

    checkExisting = await usersCollection.findOne({email: username})
    delete checkExisting["password"];
    return checkExisting;
}

async function enrollTopic(userid, topicid) {
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
    const topicCollection = await courses();
    checkExisting = await topicCollection.findOne({_id: topicid});
    if (!checkExisting) {
        throw "Course does not exist";
    }

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