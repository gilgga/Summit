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

const uuid = require('uuid') //for generating _id's
const connection = require('../config/mongoConnection');

const allCollections = require('../config/mongoCollections');
const usersCollectionFunction = allCollections.users;
const coursesCollectionFunction = allCollections.courses;
const topicCollectionFunction = allCollections.topics;
const postCollectionFunction = allCollections.posts;

const {topics, courses, users, posts} = require(".");

const main = async () => {
    const usersCollection = await usersCollectionFunction();
    const coursesCollection = await coursesCollectionFunction();
    const topicCollection = await topicCollectionFunction();
    const postCollection = await postCollectionFunction();

    usersCollection.deleteMany({});
    coursesCollection.deleteMany({});
    topicCollection.deleteMany({});
    postCollection.deleteMany({});

    // Learning_API db
    console.log("Adding topics");
    const topic1 =  await topics.addTopic("Data Science", "Everything Data Science");
    const topic2 =  await topics.addTopic("Network and System Administration", "Everything Network and System Administration");
    const topic3 =  await topics.addTopic("Interpersonal Skills", "Everything Interpersonal Skills");
    const topic4 =  await topics.addTopic("Graphics", "Graphic design");

    console.log("Adding courses");
    const course1  = await courses.addCourse("IT Security Fundamentals", "This beginner-level, Windows-based course covers core security concepts and introduces risks such as social engineering, malware, and spyware.", "Network and System Administration");
    const course2  = await courses.addCourse("Artificial Intelligence Foundations", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", "Data Science");
    const course3  = await courses.addCourse("Learning Bash Scripting", "This course shows you how to wrap up multiline operations in one file, implement flow control, and interact with users to get input.", "Network and System Administration");
    const course4  = await courses.addCourse("Docker for Data Science", "In this course, Jonathan Fernandes helps data scientists get up and running with Docker, demonstrating how to build a Dockerized ML application that can easily be shared.", "Data Science");
    const course5  = await courses.addCourse("Designing Infographics", " Instructor Nigel French helps you identify when a graphic representation is better than a written one, and he goes over the fundamental design aspects of infographics such as icons and font choices.", "Graphics");
    const course6  = await courses.addCourse("Historical Animation", "In this course, instructor Dermot O’Connor gives professional insights on several historical styles.", "Graphics");
    const course7  = await courses.addCourse("Learning to Be Approachable", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", "Interpersonal Skills");
    const course8  = await courses.addCourse("The Secrets to Success at Work", "In this course, we review tips for communicating more effectively, including how to develop active listening skills and project authority and confidence when you speak.", "Interpersonal Skills");
    const course9  = await courses.addCourse("Git for System Administration", "In this course, we cover how to create local and remote repositories, create and analyze commits, and roll back to previous versions of files.", "Network and System Administration");
    const course10 = await courses.addCourse("SQL Queries Made Easy", "This course was designed to help beginners build a strong foundation in SQL queries, and start using common statements to manipulate data within tables.", "Data Science");
    const course11 = await courses.addCourse("Processing Text with Python", "In this course, instructor Kumaran Ponnambalam helps you build your text mining skill set, covering key techniques for extracting, cleansing, and processing text in Python.", "Data Science");
    const course12 = await courses.addCourse("Animating in Photoshop", "Find out how to draw captivating characters with media brushes, clean up your rough drawings, and add color and inking.", "Graphics");
    
    // Summit Back end db

    console.log("Adding users");
    const user1 = await users.createUser("jdoe@example.com", "John", "Doe", "password")
    console.log("Enrolling user");
    const user1course1 = await users.enrollCourse(user1.email, course12.title);
    const user1topic1 = await users.enrollTopic(user1._id, topic1._id);
    
    console.log("adding posts");
    const post1 = await posts.addPost("My Post in IT Security!", user1._id, new Date(), "I'm excited to be in this class", course1._id, topic2._id);
    console.log("Done");
    process.exit(1);
    return;
}

main().catch((e) => {console.error(e); process.exit(1);});