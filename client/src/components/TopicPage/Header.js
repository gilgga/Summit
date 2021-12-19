import {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    Container,
    IconButton,
    DialogContentText
} from '@mui/material';

import { 
    Button,
    Card,
    CardContent,
    Grid,
    makeStyles,
    TextField,
    Typography,
 } from '@material-ui/core';

import Edit from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';

import NoImage from "../../img/ProfileImage.jpeg"
import queries from '../../queries';
import { blue } from '@material-ui/core/colors';
import { PaddingOutlined } from '@mui/icons-material';

const useStyles = makeStyles({
    input: {
        display: 'none'
    },
    card: {
        width: "100%",
        borderRadius: 75,
        margin: 'auto',
        marginLeft:  'auto',
        marginRight: 'auto',
        backgroundColor: "lightblue",
    },
    avatar: {
        marginLeft:  'auto',
        marginRight: 'auto',
    },
    grid : {
        justifyContent: "center",
        alignItems : "center",
    },
    box : {
        backgroundColor: "lightblue"
    },
    link_box : {
        border: 75,
        backgroundColor: "blue",
        width: "auto",
        margin: 'auto',
        marginLeft:  'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: "center",
        paddingOutlined: 20
    },
    link : {
        color: "white",
        marginLeft:  'auto',
        marginRight: 'auto',
        justifyContent: "center",
        textDecoration: "none",
        fontSize: 20
    }
});
const Header = (props) => {
    const {topic, courses} = props;
    const classes =  useStyles();
    let EditButton = null;

    if (courses)
    EditButton = courses && courses.map((course, index) => {
        return (
            <Grid key = {index} item className={classes.link_box}>
                <Link className={classes.link} to={`/courses/${course._id}`}>
                    {course.title}
                </Link>
            </Grid>
        )
    });

    return (
        <>  
            <Container fixed width="100%" disableGutters >
                <Grid
                    container
                    className = {classes.grid}
                    spacing={2}
                >
                    <Grid item xs={12}>
                            <Typography
                                align = "center"
                                variant="h1"
                                component="h1"
                            >
                                {topic.title}
                            </Typography>
                    </Grid>
                    {EditButton}
                </Grid>
            </Container>
        </>
    );
}

export default Header;