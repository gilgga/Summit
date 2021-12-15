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

async function addCourseToTopic(courseid, topicid) {
    if (!courseid || !topicid) throw "course and topic ids required";
    const allTopics = await topics();
    const topic = await allTopics.findOne({_id: topicid});
    if (!topic) {
        throw "Could not find topic";
    }
    const updateTopic = await allTopics.updateOne({_id: topic._id}, {$push: {courses: courseid}})
    if (updateTopic.modifiedCount !== 1) throw "Failed to update course to topic list";
    return await allTopics.findOne({_id: topicid}); 
}

async function getTopics() {
    const allTopics = await topics();
    const topic = await allTopics.find({});
    return await topic.toArray();

}

async function getTopic(id) {
    if (!id) {
        throw "id not provided";
    }
    id = ObjectId(id);
    const allTopics = await topics();
    const topic = await allTopics.findOne({_id: id});
    if (!(await topic)) {
        throw "Topic not found";
    }
    return await topic;

}
module.exports = {
    addTopic,
    addCourseToTopic,
    getTopic,
    getTopics
}