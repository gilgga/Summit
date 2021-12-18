import randomColor from 'randomcolor';
import { useQuery } from '@apollo/client';

import {
    Container
} from '@mui/material';

import {
    Grid
} from '@material-ui/core';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import Topic from './Topic';
import queries from '../queries';


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
    
    if ( loading ) {
        return (
            <Container fixed>
                <CircularProgress />
            </Container>
        )
    } else if ( error ) {
        return (
            <Container fixed>
                <Alert severity="error">Error: 404 Not Found</Alert>
            </Container>
        )
    } else {
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
    }
};

export default TopicFeed;