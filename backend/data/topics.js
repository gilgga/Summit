const mongoCollections = require("../config/mongoCollections")
const {ObjectId} = require('mongodb');
const topics = mongoCollections.topics;

async function addTopic(title, description) {
    if (!title, !description) throw "title and description required";
    let newTopic = {
        title: title,
        description: description,
        courses: [],
        usersEnrolled: []
    }
    const allTopics = await topics();
    let insertTopic = await allTopics.insertOne(newTopic);
    let newId = insertTopic.insertedId;
    if (!newId) throw "error adding topic";
    const topic = await allTopics.findOne({_id: newId});

    return topic;
}

async function addCourseToTopic(courseTitle, topicTitle) {
    if (!courseTitle || !topicTitle) throw "course and topic titles required";
    const allTopics = await topics();
    const topic = await allTopics.findOne({title: topicTitle});
    let newCourses = [...topic.courses, courseTitle]
    const updateTopic = await allTopics.updateOne({_id: topic._id}, {$set: {courses: newCourses}})
    if (updateTopic.modifiedCount !== 1) throw "Failed to update course to topic list";
    return await allTopics.findOne({title: topicTitle}); 
}

module.exports = {
    addTopic,
    addCourseToTopic
}