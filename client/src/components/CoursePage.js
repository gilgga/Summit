import {react, useState, useEffect} from 'react';
import Link from 'react-router-dom/Link';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom'
import queries from '../queries.js';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Stack,
} from '@mui/material'



const CoursePage = (props) => {
    const [courseData, setCourseData] = useState(null);
    const [topicId, setTopicId] = useState(null);
    const [topicData, setTopicData] = useState(null)
    const { id } = useParams();
    const {loading, error, data} = useQuery(queries.GET_COURSE, {
        variables: {id: id},
        fetchPolicy: "network-only"
    })
    const {loading: topic_loading, error: topic_error, data: topic_data} = useQuery(queries.GET_TOPIC, {
        variables: {id: topicId},
        skip: !topicId,
        fetchPolicy: "network-only"
    })
    useEffect(() => {
        if(courseData)
        console.log(courseData);
        console.log(topicData)
    }, [courseData, topicData])
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
        setTopicId(data.getCourse.topic)
    }

    if (topic_loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (topic_error){
        console.log(JSON.stringify(topic_error, null, 2));
        return <h2>404: Page Not Found</h2>;
    }
    if(topic_data && !topicData){
        setTopicData(topic_data.getTopic)
    }

    if(courseData && topicData)
    return (
        <div>
            <h1>{courseData.title}</h1>
            <h2>{topicData.title}</h2>
            <span>{courseData.description}</span>
            
        </div>
    )
    else return (
        <div>

        </div>
    )
}

export default CoursePage;