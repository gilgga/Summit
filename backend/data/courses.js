const mongoCollections = require("../config/mongoCollections")
const courses = mongoCollections.courses
const {ObjectId} = require('mongodb');
const topicsData = require('./topics.js')

async function addCourse(title, description, topic) {
    if (!title || !description || !topic) throw "title, description, and topic required";
    let newCourse = {
        title: title,
        description: description,
        topic: topic,
        usersEnrolled: []
    }
    const courses = await courses()
    let insertCourse = await courses.insertOne(newCourse);
    let newId = insertCourse.insertedId;
    if (!newId) throw "error adding course";
    const course = await courses.findOne({_id: newId});
    topicsData.addCourseToTopic(title, topic)

    return course;
}

module.exports = {
    addCourse
}