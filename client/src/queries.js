import { gql } from '@apollo/client';

// const GET_POST = gql`
//     query getPost()  {
//         posts() {
//             _id
//             title
//             user
//             time
//             content
//             topic
//             course
//         }
//     }
// `;

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

let exported = {
    GET_TOPIC,
    GET_TOPICS,
    GET_COURSE,
    GET_COURSES,
    CREATE_USER,
    LOGIN_USER
};

export default exported;
