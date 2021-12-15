const mongoCollections = require("../config/mongoCollections")
const posts = mongoCollections.posts
const {ObjectId} = require('mongodb');
const { posts } = require("../config/mongoCollections");

async function addPost(title, user, time, content, topic, course){
    if (!title || !user || !time || !content || !topic) throw "title, user, time, content and topic required for new Post";
    let newPost = {
        title: title,
        user: user,
        time: time,
        content: content,
        topic: topic,
        course: course
    }
    const posts = await posts();
    let insertPost = await posts.insertOne(newPost);
    let newId = insertPost.insertedId;
    if (!newId) throw "error adding post";
    const post = await posts.findOne({_id: newId});

    return post;
}

async function editPost()

async function deletePost()