/*
    - Users
    - Topics
    - Courses
    - Posts
*/

/* 
    What to seed:
    - 2 users, 2 topics, 2 courses
    - 2 Topic Posts, 2 Course Posts
*/

const dbConnection = require('../config/mongoConnection')
const uuid = require('uuid') //for generating _id's
const courses;
const topics;
const users;
const posts;
const main = async () => {
    const db = await dbConnection();
    // Learning_API db
    const course1 = courses.addCourse(new uuid(), "IT Security Fundamentals", "This beginner-level, Windows-based course covers core security concepts and introduces risks such as social engineering, malware, and spyware.", ["IT Help Desk", "Network and System Administration"])
    const course2 = courses.addCourse(new uuid(), "Artificial Intelligence Foundations", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", ["Data Science", "Machine Learning"])
    
    const topic1 = topics.addTopic(new uuid(), "Data Science", "")
    const topic2 = topics.addTopic(new uuid(), "IT Help Desk", "")
    // Summit Back end db

    const user1 = users.addUser(new uuid(), "jdoe@example.com", "image_data", "John", "Doe", "password")
    const user1course1 = users.enrollCourse(user1, course1);
    const user1topic1 = users.enrollTopic(user1, topic1);

    const post1 = posts.addPost(new uuid(), "My Post in IT Security!", user1, "I'm excited to be in this class", {course: "IT Security Fundamentals"})

}