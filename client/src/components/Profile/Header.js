import {react, useEffect, useState} from 'react';
import {
    Avatar,
    Container,
    IconButton
} from '@mui/material';

import { 
    Card,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
 } from '@material-ui/core';

 import {
     Edit as EditIcon
 } from '@mui/icons-material'

import NoImage from "../../img/ProfileImage.jpeg"
import background from "../../img/background.jpeg"

const useStyles = makeStyles({
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
        marginRight: 'auto'
    },
    grid : {
        justifyContent: "center",
        alignItems : "center"
    },
    box : {
        backgroundColor: "lightblue"
    },
});
const Header = (props) => {
    const {user} = props;
    const classes =  useStyles();
    const [edit, setEdit] = useState(false);    

    return (
        <>
            <Container fixed width="100%" disableGutters>
                <Grid
                    container
                    className = {classes.grid}
                >
                <Card className={classes.card} variant="outlined">
                    <CardContent

                        className = {classes.h1}
                    >
                        <Avatar 
                            className = {classes.avatar}
                            sx={{ width: 150, height: 150 }}
                            alt = {user.firstName + " " + user.lastName}
                            src = {NoImage}
                        />
                        <IconButton onClick={() => setEdit(!edit)}  size="large" aria-label="edit" >
                            <EditIcon fontSize="inherit"/>
                        </IconButton>
                        <Typography
                            align = "center"
                            variant="h1"
                            component="h1"
                        >
                            {user.firstName + " " + user.lastName}
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            </Container>
        </>
    );
}

export default Header;