import {react, useEffect, useState} from 'react';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Container,
    IconButton,
    DialogContentText
} from '@mui/material';

import { 
    Button,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    Grid,
    makeStyles,
    TextField,
    Typography,
 } from '@material-ui/core';

 import {
     Edit as EditIcon
 } from '@mui/icons-material'

import NoImage from "../../img/ProfileImage.jpeg"

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
        marginRight: 'auto',
    },
    grid : {
        justifyContent: "center",
        alignItems : "center",
    },
    box : {
        backgroundColor: "lightblue"
    },
});
const Header = (props) => {
    const {user} = props;
    const defaultValues = {
        description: "",
        courses: [],
        topics: [],
    };
    const authorized = true;

    const classes =  useStyles();

    const [edit, setEdit] = useState(false);    
    const [formValues, setFormValues] = useState(defaultValues);
    const [invalidEdits, setInvalidEdits] = useState(true);


    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formValues);
    };


    useEffect(() => {
        if (!formValues.description) {
            setInvalidEdits(true);
        } else {
            setInvalidEdits(false);
        }
    }, [formValues]);

    const EditForm = authorized && 
        <>
                    <Dialog
                open={edit}
                onClose= {() => setEdit(false)}
            >
                <DialogTitle
                    id="Edit Form Title"
                    onClose = {() => setEdit(false)}
                >
                    Edit Profile
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Customize your profile!
                    </DialogContentText>
                        <form onSubmit={handleSubmit}>
                            <Grid 
                                container 
                                alignItems="center" 
                                justifyContent="center" 
                                spacing = {5}            
                            >
                                    <Grid item xs = {12}>
                                        <TextField
                                            id = "description-input"
                                            name = "description"
                                            label = "Description"
                                            value = {formValues.description}
                                            onChange = {handleInputChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item>
                                    <Button
                                        onClick = {() => setEdit(false)}
                                        color = "primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant = "contained"
                                        color = "primary"
                                        type = "submit"
                                        disabled = {invalidEdits}
                                        onClick = {() => setEdit(false)}
                                    >
                                        Save Changes
                                    </Button>
                                    </Grid>
                            </Grid>
                        </form>
                </DialogContent>
            </Dialog>
        </>

    const EditButton = authorized &&
        <>
            <Button variant="contained" color="primary" startIcon={<EditIcon/>} onClick={() => setEdit(!edit)}>
                    Edit Profile
            </Button>
        </>

    return (
        <>  
            {EditForm}
            <Container fixed width="100%" disableGutters >
                <Grid
                    container
                    className = {classes.grid}
                    spacing={2}
                >
                    <Grid item xs={12}>
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
                    <Grid item>
                        {EditButton}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Header;