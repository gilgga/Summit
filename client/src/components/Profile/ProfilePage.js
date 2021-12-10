import react from 'react';
import {
    Grid,
    makeStyles
} from "@material-ui/core";

import Posts from './Posts';
import Header from './Header';
import Description from './Description'

const exampleUser = {
    _id: 1234,
    username: "TestUsername",
    email: "test@test.com",
    firstName: "Your",
    lastName: "Mum",
    description: "This is a description of me!",
}

const usertopics = [];
const usercourses = [];


const useStyles = makeStyles({
    box: {
        width: 500,
        height: 500,
        color: "lightblue"
    },
    grid : {
        justifyContent: "center",
        alignItems : "center"  
    }
});

const ProfilePage = () => {
    const classes = useStyles();
    return (
        <>
            <Header user={exampleUser}/>
            <br></br>
            <Grid 
                container 
                className = {classes.grid}
            >
                <Grid item xs={12} >
                    <Description user={exampleUser}/>
                </Grid>
                <Grid item xs={12}>
                    <Posts user={exampleUser}/>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfilePage;