import { gql } from '@apollo/client';



const GET_TOPIC = gql`
    query ($id: ID!) {
        getTopic(id : $id) {
            _id
            title
            description
            usersEnrolled
            courses
        }
    }
`;

const GET_TOPICS = gql`
    query{
        getTopics {
            _id
            title
            description
            usersEnrolled
            courses
        }
    }
`;


const GET_COURSE = gql`
    query ($id: ID!) {
        getCourse(id : $id) {
            _id
            title
            description
            usersEnrolled
            topic
        }
    }
`;

const GET_COURSE_POSTS = gql`
    query ($courseid: ID!){
        getPostsFromCourse (courseid: $courseid){
            title
            content
            user
            time
            topic
            course
        }
    }
`;

const GET_TOPIC_POSTS = gql`
    query ($topicid: ID!){
        getPostsFromTopic (topicid: $topicid){
            title
            content
            user
            time
            topic
            course
        }
    }
`;

const GET_TOPIC_COURSES = gql`
    query ($id: ID!){
        getTopicCourses (id: $id){
            _id
            title
            description
        }
    }
`;

const GET_COURSES = gql`
    query {
        getCourses {
            _id
            title
            description
            usersEnrolled
            topic
        }
    }
`;

const LOGIN_USER = gql`
    query(
        $email: String!
        $password: String!
        ) {
        loginUser(
            email: $email
            password: $password
            ) {
                _id
                email
                description
                firstName
                lastName
                topics
                courses 
        }  
    }
`;

const CREATE_USER = gql`
    mutation newUser(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
    ) {
        createUser(
            email : $email
            password : $password
            firstName : $firstName
            lastName : $lastName
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
        }
    }
`;

const EDIT_DESCRIPTION = gql`
    mutation newDescription(
        $id: ID!
        $description: String
        $image: String
    ) {
        editDescription (
            id: $id
            description: $description
            image: $image
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
            image
        }
    }
`;

const ENROLL_COURSE = gql`
    mutation enrollCourse (
        $id: ID!
        $courseid: ID!
    ) {
        enrollUserCourse (
            id: $id
            courseid: $courseid
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
            image
        }
    }
`;

const UNENROLL_COURSE = gql`
    mutation unenrollCourse (
        $id: ID!
        $courseid: ID!
    ) {
        unenrollUserCourse (
            id: $id
            courseid: $courseid
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
            image
        }
    }
`;

const ENROLL_TOPIC = gql`
    mutation enrollTopic (
        $id: ID!
        $topicid: ID!
    ) {
        enrollUserTopic (
            id: $id
            topicid: $topicid
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
            image
        }
    }
`;

const UNENROLL_TOPIC = gql`
    mutation unenrollTopic (
        $id: ID!
        $topicid: ID!
    ) {
        unenrollUserTopic (
            id: $id
            topicid: $topicid
        ) {
            _id
            email
            description
            firstName
            lastName
            topics
            courses 
            image
        }
    }
`;


let exported = {
    GET_TOPIC,
    GET_TOPICS,
    GET_COURSE,
    GET_COURSES,
    GET_TOPIC_POSTS,
    GET_TOPIC_COURSES,
    GET_COURSE_POSTS,
    CREATE_USER,
    LOGIN_USER,
    EDIT_DESCRIPTION,
    ENROLL_COURSE,
    UNENROLL_COURSE,
    ENROLL_TOPIC,
    UNENROLL_TOPIC
};

export default exported;
