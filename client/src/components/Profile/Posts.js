import {useState, useEffect} from 'react';
import {
    Container,
} from '@mui/material';

import {
    Grid,
    Button
} from '@material-ui/core';

import Post from '../Post';

const Posts = (props) => {
    const {posts} = props;
    const maxPosts = 3;

    const [expanded, setExpanded] = useState(false);
    const [numPosts, setNumPosts] = useState(maxPosts);
    const [buttonText, setButtonText] = useState("See more");
    
    let expandButton = posts && posts.length > maxPosts &&  
            <Grid key="button" item>
                <Button 
                    variant = "outlined"
                    onClick = {() => setExpanded(!expanded )} 
                >
                    {buttonText}
                </Button>
            </Grid>;
        

    useEffect(() => {
        console.log(posts)
    }, [])

    useEffect(() => {
        if (expanded) {
            setNumPosts(posts.size);
            setButtonText("See less");
        } else {
            setNumPosts(maxPosts);
            setButtonText("See More");
        }
    }, [expanded]); // eslint-disable-line

    const buildPosts = posts && posts.slice(0, numPosts).map((post, index) => {
        return (
            <Grid key = {index} item xs={12}>
                <Post key = {index} post={post}/>
            </Grid>
        )
    });
    return (
        <Container fixed>
            <Grid
                container
                spacing = {3}
            >
                {buildPosts}
                {expandButton}
            </Grid>
        </Container>
    );
};

export default Posts;