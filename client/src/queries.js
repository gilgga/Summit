import { gql } from '@apollo/client';

const GET_POST = gql`
    query getPost()  {
        posts() {
            Post_Id
            Title
            User_Posted
            Time
            Content
            Category
            Topic
            Course
        }
    }
`;

const GET_TOPIC = gql`
    query getTopic() {
        topics() {
            Topic_Id
            Topicname
            Description
            Users_Enrolled
            Courses
        }
    }
`;

const GET_COURSE = gql`
    query getCourse() {
        courses() {
            Course_Id
            Coursename
            Description
            Users_Enrolled
            Topic
        }
    }
`;

let exported = {
    GET_POST,
    GET_TOPIC,
    GET_COURSE
};

export default exported;
