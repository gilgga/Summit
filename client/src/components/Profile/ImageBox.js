import react from 'react';
import {
    Avatar,
    Box,
    Container
} from '@mui/material';

import { 
    Card,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
 } from '@material-ui/core';

import NoImage from "../../img/ProfileImage.jpeg"
import background from "../../img/background.jpeg"

const useStyles = makeStyles({
    card: {
        height: 500,
        width: "100%",
        borderRadius: 75,
        margin: 'auto',
        marginLeft:  'auto',
        marginRight: 'auto',
        backgroundColor: "lightblue",
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        backgroundImage: `url(${background})`,
        backgroundSize: "cover"
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
const ImageBox = (props) => {
    const {user} = props;
    const classes =  useStyles();
    return (
        <>
            <Container fixed maxWidth="xl">
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

export default ImageBox;