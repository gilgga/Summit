const httpCodes = require('http-codes')

const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections")
const courses = mongoCollections.courses

const topicsData = require('./topics.js')

const errorChecking = require('./errors');

// Schema-Inspector Schemas
const inspector = require('schema-inspector');

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

    const sanitizedNewCourseInput = inspector.sanitize( courseSanitizationSchema, newCourseInput );
    const validatedNewCourseInput = inspector.validate( courseValidationSchema, sanitizedNewCourseInput );

    if ( !validatedNewCourseInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewCourseInput.format()
        }
    }
    
    const allCourses = await courses();
    
    let insertCourse = await allCourses.insertOne(sanitizedNewCourseInput);
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

module.exports = {
    addCourse,
    getCourse,
    getCourses
}