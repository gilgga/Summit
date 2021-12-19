const httpCodes = require('http-codes');

const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections")
const topics = mongoCollections.topics;
const errorChecking = require('./errors');

// Schema-Inspector Schemas
const inspector = require('schema-inspector');

const topicSanitizationSchema = {
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
        courses: {
            type: "array"
        }
    }
};

const topicValidationSchema = {
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
        courses: {
            type: "array"
        }
    }
};

async function addTopic(title, description) {
    let newTopicInput = {
        title: title,
        description: description,
        courses: [],
        usersEnrolled: []
    }

    inspector.sanitize( topicSanitizationSchema, newTopicInput );
    const validatedNewTopicInput = inspector.validate( topicValidationSchema, newTopicInput );

    if ( !validatedNewTopicInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewTopicInput.format()
        }
    }

    const allTopics = await topics();

    let insertTopic = await allTopics.insertOne(newTopicInput);
    let newId = insertTopic.insertedId;
    if (!newId) throw "error adding topic";
    const topic = await allTopics.findOne({_id: newId});

    return await topic;
}

async function addCourseToTopic(courseid, topicid) {
    if (!courseid || !topicid) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "course and topic ids required"
        }
    }
    
    const allTopics = await topics();
    const topic = await allTopics.findOne({_id: topicid});
    if (!topic) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Could not find topic"
        }
    }
    const updateTopic = await allTopics.updateOne({_id: topic._id}, {$push: {courses: courseid}})
    if (updateTopic.modifiedCount !== 1) {
        throw {
            status: httpCodes.INTERNAL_SERVER_ERROR,
            message: "Failed to update course to topic list"
        }
    }
    return await allTopics.findOne({_id: topicid}); 
}

async function getTopics() {
    const allTopics = await topics();
    const topic = await allTopics.find({});
    return await topic.toArray();

}

async function getTopic(id) {
    if (!id) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }

    id = errorChecking.sanitizeId( id );

    const allTopics = await topics();
    
    const topic = await allTopics.findOne({_id: id});
    if (!(await topic)) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Topic not found"
        }
    }
    return await topic;

}
module.exports = {
    addTopic,
    addCourseToTopic,
    getTopic,
    getTopics
}