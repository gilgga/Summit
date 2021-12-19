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

const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            user
            time
            content
            topic
            course
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
const CREATE_POST = gql`
    mutation createPost (
            $user: String!
            $title: String!
            $time: String!
            $content: String!
            $course: ID!
            $topic: ID!
        ) {
            createPost(
                user : $user
                title : $title
                time : $time
                content : $content
                course : $course
                topic : $topic
            ) {
                _id
                title
                user
                time
                content
                topic
                course
            }
        }
`;


const EDIT_PROFILE = gql`
    mutation newProfile(
        $id: ID!
        $description: String
        $image: String
    ) {
        editProfile (
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

const GET_POSTS_FROM_USER = gql`
    query ($userid: String!) {
        getPostsFromUser(userid : $userid) {
            _id
            title
            user
            time
            content
            topic
            course
        }
    }
`;

const GET_USER = gql`
    query ($userid: String!) {
        getUser(userid :  $userid) {
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

const GET_USER_COURSE_DETAILS = gql`
    query ($userid: String!) {
        getUserCourseDetails(userid : $userid) {
            _id
            title
            description
            usersEnrolled
            topic
        }
    }
`;

const GET_USER_TOPIC_DETAILS = gql`
    query ($userid: String!) {
        getUserTopicDetails(userid : $userid) {
            _id
            title
            description
            usersEnrolled
            courses
        }
    }
`


let exported = {
    GET_TOPIC,
    GET_TOPICS,
    GET_COURSE,
    GET_COURSES,
    GET_POSTS,
    GET_TOPIC_POSTS,
    GET_TOPIC_COURSES,
    GET_COURSE_POSTS,
    CREATE_USER,
    CREATE_POST,
    LOGIN_USER,
    EDIT_PROFILE,
    ENROLL_COURSE,
    UNENROLL_COURSE,
    ENROLL_TOPIC,
    UNENROLL_TOPIC,
    GET_POSTS_FROM_USER,
    GET_USER,
    GET_USER_COURSE_DETAILS,
    GET_USER_TOPIC_DETAILS
};

export default exported;
