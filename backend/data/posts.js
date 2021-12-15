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

module.exports = {
    addPost
}