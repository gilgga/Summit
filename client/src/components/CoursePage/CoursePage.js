import {react, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom'
import queries from '../../queries.js';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Stack,
  Container
} from '@mui/material'
import {
    Grid,
    Typography
} from "@material-ui/core";
import Posts from './Posts'
import Header from './Header'
import Description from './Description';


const CoursePage = (props) => {
    const [courseData, setCourseData] = useState(null);
    const [topicId, setTopicId] = useState(null);
    const [postsData, setPostsData] = useState(null);
    const [topicData, setTopicData] = useState(null)
    const { id } = useParams();
    const {loading, error, data} = useQuery(queries.GET_COURSE, {
        variables: {id: id.toString()},
        fetchPolicy: "network-only"
    })
    const {loading: topic_loading, error: topic_error, data: topic_data} = useQuery(queries.GET_TOPIC, {
        variables: {id: topicId},
        skip: !topicId,
        fetchPolicy: "network-only"
    })
    const {loading: posts_loading, error: posts_error, data: posts_data} = useQuery(queries.GET_COURSE_POSTS, {
        variables: {courseid: id.toString()},
        fetchPolicy: "network-only"
    })
    useEffect (() => {
        if(topicId){
            console.log(topicId)
            console.log(topicId.toString())
        }
    },[])
    useEffect(() => {
        if(courseData)
        console.log(courseData);
        console.log(topicData)
        console.log(postsData)
    }, [courseData, topicData, postsData])
    if (loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (error){
        console.log(JSON.stringify(error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(data && !courseData){
        setCourseData(data.getCourse)
        setTopicId(data.getCourse.topic.replace(/['"]+/g, ''))
    }

    if (topic_loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (topic_error){
        console.log(topicId)
        console.log(JSON.stringify(topic_error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(topic_data && !topicData){
        setTopicData(topic_data.getTopic)
    }
    if (posts_loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (posts_error){
        console.log(topicId)
        console.log(JSON.stringify(posts_error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(posts_data && !postsData) setPostsData(posts_data.getPostsFromCourse)

    if(courseData && topicData)
    return (
        <div>
        <Container fixed>

        <Grid 
            container 
            spacing = {5}
        >

            <Grid item xs={12}>
                <Header course={courseData} topic={topicData}/>
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
                <Description course={courseData}/>
            </Grid>

            <Typography
                align = "left"
                variant = "h4"
                component = "h4"
            >
                {courseData.title} Posts
            </Typography>
            <Grid item xs={12}>
                <Posts posts={postsData}/>
            </Grid>

        </Grid>
        </Container>
        </div>
        
    )
    else return (
        <div>

        </div>
    )
}

export default CoursePage;