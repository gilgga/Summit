const httpCodes = require('http-codes');

const {ObjectId} = require('mongodb');
const mongoCollections = require("../config/mongoCollections")
const posts = mongoCollections.posts;

const errorChecking = require('./errors');

// Schema-Inspector Schemas
const inspector = require('schema-inspector');

const postSanitizationSchema = {
    type: "object",
    strict: true,
    properties: {
        title: {
            type: "string",
            optional: false,
            minLength: 1
        },
        user: {
            type: "string",
            optional: false,
            def: "Anonymous",
            minLength: 1
        },
        time: {
            type: "date",
            optional: false,
            def: Date.now()
        },
        content: {
            type: "string"
        },
        topic: {
            type: "string"
        },
        course: {
            type: "string"
        }
    }
};

const postValidationSchema = {
    type: "object",
    strict: true,
    properties: {
        title: {
            type: "string",
            optional: false,
            minLength: 1
        },
        user: {
            type: "string",
            optional: false,
            minLength: 1
        },
        time: {
            type: "date",
            optional: false
        },
        content: {
            type: "string"
        },
        topic: {
            type: "string"
        },
        course: {
            type: "string"
        }
    }
};

async function addPost(title, user, time, content, topic, course){
    let newPostInput = {
        title: title,
        user: user,
        time: time,
        content: content,
        topic: topic,
        course: course
    }

    inspector.sanitize( postSanitizationSchema, newPostInput );
    const validatedNewPostInput = inspector.validate( postValidationSchema, newPostInput );

    if ( !validatedNewPostInput.valid ) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: validatedNewPostInput.format()
        }
    }

    const postsCollection = await posts();
    
    let insertPost = await postsCollection.insertOne(newPostInput);
    let newId = insertPost.insertedId;
    if (!newId) throw "error adding post";
    const post = await postsCollection.findOne({_id: newId});

    return post;
}

async function getCoursePosts(courseid) {
    if (!courseid) {
        throw "Course id required";
    }
    const postsCollection = await posts();
    const coursePosts = await postsCollection.find({
        course: courseid
    });
    return coursePosts.toArray();
}


async function getTopicPosts(topicid) {
    if (!topicid) {
        throw "topic id required";
    }
    const postsCollection = await posts();
    const topicPosts = await postsCollection.find({
        topic: topicid
    });
    return topicPosts.toArray();
}
async function getPosts() {
    const allPosts = await posts();
    const post = await allPosts.find({});
    return await post.toArray();
}

async function getPost(id) {
    if (!id) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "id not provided"
        }
    }
    
    id = errorChecking.sanitizeId( id );

    const allPosts = await posts();
    
    const post = await allPosts.findOne({_id: id});
    if (!(await post)) {
        throw {
            status: httpCodes.NOT_FOUND,
            message: "Post not found"
        }
    }
    return await topic;

}

async function getPostsFromTopic(topicid) {
    if (!topicid) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "topicid not provided"
        }
    }

    topicid = errorChecking.sanitizeId(topicid);

    const allPosts = await posts();

    const post = await allPosts.find({topic : topicid});
    
    return await post.toArray();
}

async function getPostsFromCourse(courseid) {
    if (!courseid) {
        throw {
            status: httpCodes.BAD_REQUEST,
            message: "courseid not provided"
        }
    }

    courseid = errorChecking.sanitizeId(courseid);

    const allPosts = await posts();

    const post = await allPosts.find({course : courseid});
    
    return await post.toArray();
}

module.exports = {
    addPost,
    getCoursePosts,
    getTopicPosts,
    getPosts,
    getPost,
    getPostsFromTopic,
    getPostsFromCourse
}