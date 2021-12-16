const mongoCollections = require("../config/mongoCollections")
const courses = mongoCollections.courses
const {ObjectId} = require('mongodb');
const topicsData = require('./topics.js')

async function addCourse(title, description, topicid) {
    if (!title || !description || !topicid) throw "title, description, and topicid required";
    let newCourse = {
        title: title,
        description: description,
        topic: topicid,
        usersEnrolled: []
    }
    const allCourses = await courses();
    let insertCourse = await allCourses.insertOne(newCourse);
    let newId = insertCourse.insertedId;
    if (!newId) {
        throw "error adding course";
    }
    

    const course = await allCourses.findOne({_id: newId});
    
    await topicsData.addCourseToTopic(newId, topicid)

    return course;
}

async function getCourses() {
    const allCourses = await courses();
    const course = await allCourses.find({});
    return course.toArray();

}

async function getCourse(id) {
    if (!id) {
        throw "id not provided";
    }
    id = ObjectId(id);
    const allCourses = await courses();
    const course = await allCourses.findOne({_id: id});
    if (!course) {
        throw "Course not found";
    }
    return course;

}

module.exports = {
    addCourse,
    getCourse,
    getCourses
}