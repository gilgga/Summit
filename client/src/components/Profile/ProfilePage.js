import { useQuery } from '@apollo/client';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

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

import queries from '../../queries';

const ProfilePage = () => {

    const { data: dataU, loading: loadingU, error: errorU } = useQuery(queries.GET_USER);   // eslint-disable-line
    const { data: dataC, loading: loadingC, error: errorC } = useQuery(queries.GET_USER_COURSE_DETAILS);    // eslint-disable-line
    const { data: dataT, loading: loadingT, error: errorT } = useQuery(queries.GET_USER_TOPIC_DETAILS); // eslint-disable-line
    const {data, loading, error} = useQuery(queries.GET_POSTS_FROM_USER);   // eslint-disable-line

    console.log("U");
    console.log( dataU );
    console.log("C");
    console.log( dataC );
    console.log("T");
    console.log( dataT );
    console.log("D");
    console.log(data);

    const fullName = dataU.firstName + " " + dataU.lastName;
    const currentUser = useSelector((state) => state.user);

    if (currentUser._id === -1) {
        return (<Redirect to='/login'/>);
    }

    return (
        <>
            <br></br>
            <Container fixed>

            <Grid 
                container 
                spacing = {5}
            >

                <Grid item xs={12}>
                    <Header user={dataU}/>
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
                        {dataU.description}
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
                    <Posts user={data}/>
                </Grid>


                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Courses {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Courses courses = {dataC}/>
                </Grid>

                <Typography
                    align = "left"
                    variant = "h4"
                    component = "h4"
                >
                    Topics {fullName} follows
                </Typography>
                <Grid item xs={12}>
                    <Topics topics = {dataT} />
                </Grid>
            </Grid>
            </Container>
        </>
    )
}

export default ProfilePage;