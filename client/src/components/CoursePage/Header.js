import { Link } from 'react-router-dom';
import {
    Box,
    Container,
} from '@mui/material';

import { 
    Grid,
    makeStyles,
    Typography,
 } from '@material-ui/core';


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
    },
    avatar: {
        marginLeft:  'auto',
        marginRight: 'auto',
    },
    grid : {
        justifyContent: "center",
        alignItems : "center",
    },
    link_box : {
        border: 75,
        backgroundColor: "blue",
        width: "auto",
        margin: 'auto',
        marginLeft:  'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: "center"
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
    const {course, topic} = props;

    const classes =  useStyles();

    return (
        <>  
            <Container fixed width="100%" disableGutters >
                <Grid
                    container
                    className = {classes.grid}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Box
                            className={classes.card}
                        >
                        
                        <br></br>
                        <Typography
                            align = "center"
                            variant="h1"
                            component="h1"
                        >
                            {course.title}
                        </Typography>

                        </Box>
                    </Grid>
                    <Grid item className={classes.link_box}>
                    <Link className={classes.link} to={`/topics/${topic._id}`}>
                        {topic.title}
                      </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Header;