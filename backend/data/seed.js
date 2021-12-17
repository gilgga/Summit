const uuid = require('uuid') //for generating _id's
const connection = require('../config/mongoConnection');

const allCollections = require('../config/mongoCollections');
const usersCollectionFunction = allCollections.users;
const coursesCollectionFunction = allCollections.courses;
const topicCollectionFunction = allCollections.topics;
const postCollectionFunction = allCollections.posts;

const {topics, courses, users, posts} = require(".");

async function seed() {
    const usersCollection = await usersCollectionFunction();
    const coursesCollection = await coursesCollectionFunction();
    const topicCollection = await topicCollectionFunction();
    const postCollection = await postCollectionFunction();

    await usersCollection.deleteMany({});
    await coursesCollection.deleteMany({});
    await topicCollection.deleteMany({});
    await postCollection.deleteMany({});

    console.log("Adding topics");
    const topic1 =  await topics.addTopic("Data Science", "Everything Data Science");
    const topic2 =  await topics.addTopic("Network and System Administration", "Everything Network and System Administration");
    const topic3 =  await topics.addTopic("Interpersonal Skills", "Everything Interpersonal Skills");
    const topic4 =  await topics.addTopic("Graphics", "Graphic design");

    console.log("Adding courses");
    const course1  = await courses.addCourse("IT Security Fundamentals", "This beginner-level, Windows-based course covers core security concepts and introduces risks such as social engineering, malware, and spyware.",
        topic2._id);
    const course2  = await courses.addCourse("Artificial Intelligence Foundations", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.", 
        topic1._id);
    const course3  = await courses.addCourse("Learning Bash Scripting", "This course shows you how to wrap up multiline operations in one file, implement flow control, and interact with users to get input.",
        topic2._id);
    const course4  = await courses.addCourse("Docker for Data Science", "In this course, Jonathan Fernandes helps data scientists get up and running with Docker, demonstrating how to build a Dockerized ML application that can easily be shared.", 
        topic1._id);
    const course5  = await courses.addCourse("Designing Infographics", " Instructor Nigel French helps you identify when a graphic representation is better than a written one, and he goes over the fundamental design aspects of infographics such as icons and font choices.",
         topic3._id);
    const course6  = await courses.addCourse("Historical Animation", "In this course, instructor Dermot O’Connor gives professional insights on several historical styles.", 
        topic3._id);
    const course7  = await courses.addCourse("Learning to Be Approachable", "In this course, we review the definition and types of machine learning: supervised, unsupervised, and reinforcement.",
        topic4._id);
    const course8  = await courses.addCourse("The Secrets to Success at Work", "In this course, we review tips for communicating more effectively, including how to develop active listening skills and project authority and confidence when you speak.",
        topic4._id);
    const course9  = await courses.addCourse("Git for System Administration", "In this course, we cover how to create local and remote repositories, create and analyze commits, and roll back to previous versions of files.", 
        topic2._id);
    const course10 = await courses.addCourse("SQL Queries Made Easy", "This course was designed to help beginners build a strong foundation in SQL queries, and start using common statements to manipulate data within tables.",
        topic1._id);
    const course11 = await courses.addCourse("Processing Text with Python", "In this course, instructor Kumaran Ponnambalam helps you build your text mining skill set, covering key techniques for extracting, cleansing, and processing text in Python.",
        topic1._id);
    const course12 = await courses.addCourse("Animating in Photoshop", "Find out how to draw captivating characters with media brushes, clean up your rough drawings, and add color and inking.", 
        topic3._id);
    
    console.log("Adding user");
    const user1 = await users.createUser("jdoe@example.com", "Password12", "John", "Doe")
    console.log("Enrolling user in courses and topics");
    const user1course1 = await users.enrollCourse(user1._id, course12._id, true);
    const user1topic1 = await users.enrollTopic(user1._id, topic1._id, true);
    
    console.log("Adding posts");
    const post1 = await posts.addPost("IT Security is so interesting!", user1._id, new Date(), "I'm excited to be in this class", course1._id, topic2._id);
    const post2 = await posts.addPost("I just learned how to create a user", user1._id, new Date(), "Sysadmininstration is difficult :(", course3._id, topic2._id);
    const post3 = await posts.addPost("How do I crop an image?", user1._id, new Date(), "Can I just photoshop my degree?", course12._id, topic3._id);
    const post4 = await posts.addPost("SELECT * from where 1 = 1", user1._id, new Date(), "Preventing SQL injections are so hard!", course10._id, topic1._id);
    const post5 = await posts.addPost("This course is super useful", user1._id, new Date(), "Super useful!", course8._id, topic4._id);

    const post6 = await posts.addPost("Docker help???", user1._id, new Date(), "Docker is such a pain to setup!!!!!", course4._id, topic1._id);
    const post7 = await posts.addPost("Terrible course", user1._id, new Date(), "This course is just a bunch of buzzwords! Do not recommend.", course2._id, topic1._id);
    const post8 = await posts.addPost("SQL tip", user1._id, new Date(), "You don't actually have to capitalize operands!", course10._id, topic1._id);
    const post9 = await posts.addPost("Eh", user1._id, new Date(), "I forgot everything after I watched the video", course7._id, topic4._id);
    const post0 = await posts.addPost("Must take!", user1._id, new Date(), "I took this course after I messed up my team's branch, it won't happen again!", course9._id, topic2._id);

    console.log("Done");
    return;
}

module.exports = seed;