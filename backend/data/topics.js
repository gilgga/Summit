const mongoCollections = require("../config/mongoCollections")
const topics = mongoCollections.topics
const {ObjectId} = require('mongodb');
const { topics } = require("../config/mongoCollections");

async function addTopic(title, description) {
    if (!title, !description) throw "title and description required";
    let newTopic = {
        title: title,
        description: description,
        courses: [],
        usersEnrolled: []
    }
    const topics = await topics();
    let insertTopic = await topics.insertOne(newTopic);
    let newId = insertTopic.insertedId;
    if (!newId) throw "error adding topic";
    const topic = await topics.findOne({_id: newId});

    return topic;
}

async function addCourseToTopic(courseTitle, topicTitle) {
    if (!courseTitle || !topicTitle) throw "course and topic titles required";
    const topics = await topics();
    const topic = await topics.findOne({title: topicTitle});
    let newCourses = [...topic.courses, courseTitle]
    const updateTopic = await topics.updateOne({_id: topic._id}, {$set: {courses: newCourses}})
    if (updateTopic.modifiedCount !== 1) throw "Failed to update course to topic list";
    return await topics.findOne({title: topicTitle}); 
}

module.exports = {
    addTopic,
    addCourseToTopic
}