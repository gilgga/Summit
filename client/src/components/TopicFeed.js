import {react } from 'react';
import { v4 as uuid} from 'uuid';
import randomColor from 'randomcolor';

import {
    Container
} from '@mui/material';

import {
    Grid,
    Button,
} from '@material-ui/core';

import Topic from './Topic';

const exampleTopics = [
    {
        id: uuid(),
        name: "Computer Science",
        description: "Everything Computer Science",
        usersEnrolled: 54,
    },
    {
        id: uuid(),
        name: "Computer Engineering",
        description: "Everything Computer Engineering",
        usersEnrolled: 35,
    },
    {
        id: uuid(),
        name: "Cybersecurity",
        description: "Everything Cybersecurity",
        usersEnrolled: 420,
    },

];

const buildTopics = exampleTopics && exampleTopics.map((topic, index) => {
    return (
        <Grid key = {index} item xs={12}>
            <Topic 
                key = {index} 
                topic={topic} 
                maxwidth = {"100%"}
                avatarColor = {randomColor()}
            />
        </Grid>
    )
});

const TopicFeed = (props) => {
    return (
        <Container fixed>
            <Grid
                container
                spacing = {4}
            >
                {buildTopics}
            </Grid>
        </Container>
    )
};

export default TopicFeed;