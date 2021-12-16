import {react, useState, useEffect} from 'react';
import randomColor from 'randomcolor';
import {
    Container,
} from '@mui/material';

import {
    Grid,
    makeStyles,
    Typography,
    Button
} from '@material-ui/core';

import Topic from '../Topic';

const Topics = (props) => {
    const {topics} = props;
    const maxTopics = 3;

    const [expanded, setExpanded] = useState(false);
    const [numTopics, setNumTopics] = useState(maxTopics);
    const [buttonText, setButtonText] = useState("See more");
    
    let expandButton = topics.length > maxTopics &&  
            <Grid key="button" item>
                <Button 
                    variant = "outlined"
                    onClick = {() => setExpanded(!expanded )} 
                >
                    {buttonText}
                </Button>
            </Grid>;
        

    useEffect(() => {
        if (expanded) {
            setNumTopics(topics.size);
            setButtonText("See less");
        } else {
            setNumTopics(maxTopics);
            setButtonText("See More");
        }
    }, [expanded]);

    const buildTopics = topics && topics.slice(0, numTopics).map((topic, index) => {
        return (
            <Grid key = {index} item xs={4}>
                <Topic 
                    key = {index} 
                    topic={topic} 
                    maxwidth={350} 
                    avatarColor = {randomColor()}    
                />
            </Grid>
        )
    });
    return (
        <Container fixed>
            <Grid
                container
                spacing = {3}
            >
                {buildTopics}
                {expandButton}
            </Grid>
        </Container>
    );
};

export default Topics;