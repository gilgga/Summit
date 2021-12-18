import {v4 as uuid} from 'uuid';
import moment from 'moment';
import {
    Grid,
    Typography
} from "@material-ui/core";

import {
    Container
} from '@mui/material';

import Courses from './Courses'
import Posts from './Posts';
import Header from './Header';
import Topics from './Topics';


const exampleUser = {
    _id: 1234,
    username: "TestUsername",
    email: "test@test.com",
    firstName: "Your",
    lastName: "Mum",
    description: "This is a description of me!",
    posts: [
        {
            _id: uuid(),
            title: "My first post",
            userPosted: "Your Mum",
            time: moment().subtract(10, 'days').format('lll'),
            content: "Wow this website is great and functions so well!! ;-;"
        },        
        {
            _id: uuid(),
            title: "My first post",
            userPosted: "Your Mum",
            time: moment().subtract(10, 'days').format('lll'),
            content: "short post"
        },
        {
            _id: uuid(),
            title: "My first post",
            userPosted: "Your Mum",
            time: moment().subtract(10, 'days').format('lll'),
            content: "looooooooooooooooooooooooooooooooooooooooooooooong post"
        },
        {
            _id: uuid(),
            title: "My first post",
            userPosted: "Your Mum",
            time: moment().subtract(10, 'days').format('lll'),
            content: "REALLY ANGRY POST"
        },
        {
            _id: uuid(),
            title: "My first post",
            userPosted: "Your Mum",
            time: moment().subtract(10, 'days').format('lll'),
            content: ""
        }
    ]
}

const usertopics = [
    {
        _id: uuid(),
        title: "Stevens Discussion",
        description: "A very positive thread about stevens",
        usersEnrolled: 53,
        posts: ["I'm so happy this school is affordable", "The Computer Engineering degree is so useful!"]
    },
    {
        _id: uuid(),
        title: "Stevens Discussion",
        description: "A very positive thread about stevens",
        usersEnrolled: 24,
        posts: ["I'm so happy this school is affordable", "The Computer Engineering degree is so useful!"]
    }
];
const usercourses = [
    {
        _id: uuid(),
        title: "CPE 390",
        description : "A fantastic and well thought out course taught by the amazing Dov Kruger",
        usersEnrolled: [exampleUser],
        posts: ["Wow, I learned so much!", "He answers my questions concisely and quickly!"]// This is supposed to be a subdocument but it is a str for the time being
    },
    {
        _id: uuid(),
        title: "CPE 390",
        description : "A fantastic and well thought out course taught by the amazing Dov Kruger",
        usersEnrolled: exampleUser,
        posts: ["Wow, I learned so much!", "He answers my questions concisely and quickly!"]// This is supposed to be a subdocument but it is a str for the time being
    },
    {
        _id: uuid(),
        title: "CPE 390",
        description : "A fantastic and well thought out course taught by the amazing Dov Kruger",
        usersEnrolled: exampleUser,
        posts: ["Wow, I learned so much!", "He answers my questions concisely and quickly!"]// This is supposed to be a subdocument but it is a str for the time being
    },
];


const ProfilePage = () => {
    const fullName = exampleUser.firstName + " " + exampleUser.lastName;
    return (
        <>
            <br></br>
            <Container fixed>

            <Grid 
                container 
                spacing = {5}
            >

                <Grid item xs={12}>
                    <Header user={exampleUser}/>
                </Grid>

                <Typography
                    align = "left"
                    gutterBottom
                    variant = "h4"
                    component = "h4"
                >
                    Description
                </Typography>

                <Grid item xs={12} >
                <Typography variant="h6" color="textPrimary">
                        {exampleUser.description}
                    </Typography>
                </Grid>

                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    {fullName}'s Posts
                </Typography>
                <Grid item xs={12}>
                    <Posts user={exampleUser}/>
                </Grid>


                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Courses {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Courses courses = {usercourses}/>
                </Grid>

                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Topics {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Topics topics = {usertopics} />
                </Grid>
            </Grid>
            </Container>
        </>
    )
}

export default ProfilePage;