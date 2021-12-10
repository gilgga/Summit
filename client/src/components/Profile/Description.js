import react from 'react';
import { Container, Grid } from '@mui/material';
import { 
    makeStyles,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
    box: {
        width: 500,
        backgroundColor: "lightblue"
    },
});

const Description = (props) => {
 const { user } = props;
 const classes = useStyles();

 return (
    <>
    <Container
        fixed
        className = {classes.box}
    >
        <Grid 
            className = {classes.grid}
            container
        >
            <Typography>{user.description}</Typography>
        </Grid>
    </Container>
    </>
 );
};

export default Description;