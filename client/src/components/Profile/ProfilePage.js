import { useQuery } from '@apollo/client';
import { useSelector } from "react-redux";
import { Redirect, Link, useParams } from 'react-router-dom';
import {
    Grid,
    Typography
} from "@material-ui/core";

import {
    Button,
    Container
} from '@mui/material';

import Courses from './Courses'
import Posts from './Posts';
import Header from './Header';
import Topics from './Topics';

import queries from '../../queries';

const ProfilePage = () => {
    const {id} = useParams()
    const { data: dataU, loading: loadingU, error: errorU } = useQuery(queries.GET_USER, {
        variables: {userid: id},
        fetchPolicy: "network-only"
    });   // eslint-disable-line
    const { data: dataC, loading: loadingC, error: errorC } = useQuery(queries.GET_USER_COURSE_DETAILS, {
        variables: {userid: id},
        fetchPolicy: "network-only"
    });    // eslint-disable-line
    const { data: dataT, loading: loadingT, error: errorT } = useQuery(queries.GET_USER_TOPIC_DETAILS, {
        variables: {userid: id},
        fetchPolicy: "network-only"
    }); // eslint-disable-line
    const {data, loading, error} = useQuery(queries.GET_POSTS_FROM_USER, {
        variables: {userid: id},
        fetchPolicy: "network-only"
    });   // eslint-disable-line
    const currentState = useSelector((state) => state);
    
    if(loadingU){
        return (
            <p>Loading...</p>
        );
    }
    if(errorU){
        return <h2>404: Page Not Found</h2>;
    }
    if(loadingC){
        return (
            <p>Loading...</p>
        );
    }
    if(errorC){
        return <h2>404: Page Not Found</h2>;
    }
    if(loadingT){
        return (
            <p>Loading...</p>
        );
    }
    if(errorT){
        return <h2>404: Page Not Found</h2>;
    }
    const fullName = dataU.getUser.firstName + " " + dataU.getUser.lastName;

    if (currentState._id === -1) {
        return (<Redirect to='/login'/>);
    }
    if(dataU && dataC && dataT && data) {
    return (
        <>
            <br></br>
            <Container fixed>

            <Grid 
                container 
                spacing = {5}
            >

                { <Grid item xs={12}>
                    <Header user={dataU.getUser}/>
                </Grid> }

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
                        {dataU.getUser.description ? dataU.getUser.description : `${dataU.getUser.firstName} hasn't added a description yet!`}
                    </Typography>
                </Grid>

                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    {fullName}'s Posts
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                >   
                    <Link to="/new-post">
                    Make a New Post
                    </Link>
                </Button>
                <Grid item xs={12}>
                    <Posts posts={data.getPostsFromUser}/>
                </Grid>


                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Courses {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Courses courses = {dataC.getUserCourseDetails} user = {dataU.getUser}/>
                </Grid>

                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Topics {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Topics topics = {dataT.getUserTopicDetails} user = {dataU.getUser}/>
                </Grid>
            </Grid>
            </Container>
        </>
    )
    } else return (
        <div>

        </div>
    )
}

export default ProfilePage;