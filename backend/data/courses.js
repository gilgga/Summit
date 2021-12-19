const httpCodes = require('http-codes')

const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections")
const courses = mongoCollections.courses

const topicsData = require('./topics.js')

const errorChecking = require('./errors');

// Schema-Inspector Schemas
const inspector = require('schema-inspector');
const { topics } = require('../config/mongoCollections');

const courseSanitizationSchema = {
    type: "object",
    strict: true,
    properties: {
        title: {
            type: "string",
            optional: false,
            minLength: 1
        },
        description: {
            type: "string"
        },
        usersEnrolled: {
            type: "array"
        },
        topic: {
            type: "string"
        }
    }
};

const courseValidationSchema = {
    type: "object",
    strict: true,
    properties: {
        title: {
            type: "string",
            optional: false,
            minLength: 1
        },
        description: {
            type: "string"
        },
        usersEnrolled: {
            type: "array"
        },
        topic: {
            type: "string"
        }
    }
};

async function addCourse(title, description, topicid) {
    let newCourseInput = {
        title: title,
        description: description,
        topic: topicid,
        usersEnrolled: []
    }

    inspector.sanitize( courseSanitizationSchema, newCourseInput );
    const validatedNewCourseInput = inspector.validate( courseValidationSchema, newCourseInput );

    if ( !validatedNewCourseInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewCourseInput.format()
        }
    }
    
    const allCourses = await courses();
    
    let insertCourse = await allCourses.insertOne(newCourseInput);
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
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    id = errorChecking.sanitizeId( id );

    const allCourses = await courses();
    
    const course = await allCourses.findOne({_id: id});
    if (!course) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Course not found"
        }
    }
    return course;

}

async function getTopicCourses(topicid) {
    if (!topicid) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    topicid = errorChecking.sanitizeId( topicid );
    const allCourses = await courses();
    const topic = await topicsData.getTopic(topicid);
    if (!topic) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Could not find topic"
        }
    }

    const courseList = [];
    let thisCourse = null;

    for (let course of topic.courses){
        thisCourse = await allCourses.findOne({_id: course});
        courseList.push(thisCourse);
    }
    
    return courseList;
}

module.exports = {
    addCourse,
    getCourse,
    getTopicCourses,
    getCourses
}