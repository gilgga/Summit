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
    const topic1 = topics.addTopic("Data Science", "");
    const topic2 = topics.addTopic("Network and System Administration", "");
    const topic3 = topics.addTopic("Interpersonal Skills");
    const topic4 = topics.addTopic("Graphics", "");

    const course1 = courses.addCourse("IT Security Fundamentals", "This beginner-level, Windows-based course covers core security concepts and introduces risks such as social engineering, malware, and spyware.", "Network and System Administration");
    const course2 = courses.addCourse("Artificial Intelligence Foundations", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", "Data Science");
    const course3 = courses.addCourse("Learning Bash Scripting", "This course shows you how to wrap up multiline operations in one file, implement flow control, and interact with users to get input.", "Network and System Administration");
    const course4 = courses.addCourse("Docker for Data Science", "In this course, Jonathan Fernandes helps data scientists get up and running with Docker, demonstrating how to build a Dockerized ML application that can easily be shared.", "Data Science");
    const course5 = courses.addCourse("Designing Infographics", " Instructor Nigel French helps you identify when a graphic representation is better than a written one, and he goes over the fundamental design aspects of infographics such as icons and font choices.", "Graphics");
    const course6 = courses.addCourse("Historical Animation", "In this course, instructor Dermot O’Connor gives professional insights on several historical styles.", "Graphics");
    const course7 = courses.addCourse("Learning to Be Approachable", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", "Interpersonal Skills");
    const course8 = courses.addCourse("The Secrets to Success at Work", "In this course, we review tips for communicating more effectively, including how to develop active listening skills and project authority and confidence when you speak.", "Interpersonal Skills");
    const course9 = courses.addCourse("Git for System Administration", "In this course, we cover how to create local and remote repositories, create and analyze commits, and roll back to previous versions of files.", "Network and System Administration");
    const course10 = courses.addCourse("SQL Queries Made Easy", "This course was designed to help beginners build a strong foundation in SQL queries, and start using common statements to manipulate data within tables.", "Data Science");
    const course11 = courses.addCourse("Processing Text with Python", "In this course, instructor Kumaran Ponnambalam helps you build your text mining skill set, covering key techniques for extracting, cleansing, and processing text in Python.", "Data Science");
    const course12 = courses.addCourse("Animating in Photoshop", "Find out how to draw captivating characters with media brushes, clean up your rough drawings, and add color and inking.", "Graphics");
    
    // Summit Back end db

    const user1 = users.addUser("jdoe@example.com", "image_data", "John", "Doe", "password")
    const user1course1 = users.enrollCourse(user1, course1);
    const user1topic1 = users.enrollTopic(user1, topic1);

    const post1 = posts.addPost("My Post in IT Security!", user1, "I'm excited to be in this class", {course: "IT Security Fundamentals"})

}