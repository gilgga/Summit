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


const TopicPage = (props) => {
    const [courseData, setCourseData] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [postsData, setPostsData] = useState(null);
    const [topicData, setTopicData] = useState(null)
    const { id } = useParams();
    const {loading, error, data} = useQuery(queries.GET_TOPIC, {
        variables: {id: id.toString()},
        fetchPolicy: "network-only"
    })
    const {loading: posts_loading, error: posts_error, data: posts_data} = useQuery(queries.GET_TOPIC_POSTS, {
        variables: {topicid: id.toString()},
        fetchPolicy: "network-only"
    })
    const {loading: course_loading, error: course_error, data: course_data} = useQuery(queries.GET_TOPIC_COURSES, {
        variables: {id: id.toString()},
        fetchPolicy: "network-only"
    })
    useEffect (() => {
        if(courseId){
            console.log(courseId)
            console.log(courseId.toString())
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
    if(data && !topicData){
        console.log(data)
        setTopicData(data.getTopic)
    }
    if (posts_loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (posts_error){
        console.log(courseId)
        console.log(JSON.stringify(posts_error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(posts_data && !postsData) {
        console.log(posts_data)
        setPostsData(posts_data.getPostsFromTopic)
    }

    if (course_loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (course_error){
        console.log(courseId)
        console.log(JSON.stringify(posts_error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(course_data && !courseData) {
        console.log(course_data)
        setCourseData(course_data.getTopicCourses)
    }


    if(topicData)
    return (
        <div>
        <Container fixed>

        <Grid 
            container 
            spacing = {5}
        >

            <Grid item xs={12}>
                <Header courses={courseData} topic={topicData}/>
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
                <Description topic={topicData}/>
            </Grid>

            <Typography
                align = "left"
                variant = "h4"
                component = "h4"
            >
                {topicData.title} Posts
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

export default TopicPage;