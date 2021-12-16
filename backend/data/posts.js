const mongoCollections = require("../config/mongoCollections")
const {ObjectId} = require('mongodb');
const posts = mongoCollections.posts;

async function addPost(title, user, time, content, topic, course){
    if (!title || !user || !time || !content || !topic || !course) {
        throw "title, user, time, content and topic required for new Post";
    }
    let newPost = {
        title: title,
        user: user,
        time: time,
        content: content,
        topic: topic,
        course: course
    }
    const postsCollection = await posts();
    let insertPost = await postsCollection.insertOne(newPost);
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

module.exports = {
    addPost,
    getCoursePosts,
    getTopicPosts
}