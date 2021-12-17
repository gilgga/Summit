import {react } from 'react';
import { v4 as uuid} from 'uuid';
import randomColor from 'randomcolor';
import { useQuery } from '@apollo/client';

import {
    Container
} from '@mui/material';

import {
    Grid,
    Button,
} from '@material-ui/core';

import Topic from './Topic';
import queries from '../queries';


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


const TopicFeed = (props) => {
    const {data, loading, error} = useQuery(queries.GET_TOPICS);
    const buildTopics = data && data.getTopics.map((topic, index) => {
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