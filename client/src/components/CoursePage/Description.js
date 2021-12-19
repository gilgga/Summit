import { Container, Grid } from '@mui/material';
import { 
    Typography,
    Card,
    CardContent,
    CardActions
} from "@material-ui/core";


const Description = (props) => {
 const { course } = props;

 return (
    <>
    <Container
        fixed
    >
        <Grid 
            container
        >
            <Grid item xs={12}>
                <Card sx={{ Width: "100%"}} raised>
                    <CardContent>
                    <Typography variant="h6" color="textPrimary">
                        {course.description}
                    </Typography>
                    </CardContent>
                    <CardActions disableSpacing> </CardActions>
            </Card>   
        </Grid>    
        </Grid>
    </Container>
    </>
 );
};

export default Description;