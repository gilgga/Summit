import {useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import {
    Avatar,
    Box,
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
    box : {
        backgroundColor: "lightblue"
    },
});
const Header = (props) => {
    const {user} = props;
    const defaultValues = {
        description: "",
        image: null,
    };
    const classes =  useStyles();
    const allState = useSelector((state) => state.user);

    const [edit, setEdit] = useState(false);    
    const [formValues, setFormValues] = useState(defaultValues);
    const [invalidEdits, setInvalidEdits] = useState(true);
    const [formChange, setFormChange] = useState(false);
    const [UserImage, setUserImage] = useState(user && user.image);
    const [editProfile] = useMutation(queries.EDIT_PROFILE);
    
    const authorized = user._id === allState._id;

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if (e.target.files) {
            setFormChange(true);
        } 

        if (value.length > 0) {
            setFormChange(true);
        }

        let imageupload = null;
            if (e.target.files) {
                imageupload = e.target.files[0];
            }
            if (imageupload) {
                setFormValues({
                    ...formValues,
                    "image": imageupload,
                });
                getBase64(imageupload).then((result) => {
                    setFormValues({
                        ...formValues,
                        "image": {
                            "file" : imageupload,
                            "encoded": result
                        }
                    });
                }).catch(e => {
                    console.log(e);
                });
            }

    }


  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };    

    const handleDeleteImage = (e) => {
        setFormChange(true);
        formValues.image = null;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
            if (formValues.image || formValues.description) {
            try {
                if (!formValues.image) {
                    const {data }= await editProfile({variables: {id: user._id, description: formValues.description}});
                } else {
                    const {data }= await editProfile({variables: {id: user._id, description: formValues.description, image: formValues.image.encoded}});
                    setUserImage(data && data.editProfile.image);   
                }
            } catch (e) {
                console.log(e);
            }
        }
        setFormValues(defaultValues);
        setFormChange(false);
    };


    useEffect(() => {
        if (!formChange) {
            setInvalidEdits(true);
        } else {
            setInvalidEdits(false);
        }
    }, [formChange]);

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
                                            onChange = {handleInputChange}
                                            fullWidth
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <label htmlFor="contained-button-file">
                                            <input className={classes.input}  onChange={handleInputChange} accept="image/*" id="contained-button-file" multiple type="file" />
                                                <Button variant="contained" component="span">
                                                    Upload Profile Image
                                                </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <IconButton  disabled={!formValues.image} aria-label="delete" onClick={handleDeleteImage}>
                                        <DeleteIcon />
                                    </IconButton>
                                        { formValues.image && formValues.image.file && formValues.image.file.name ? ("File selected: " + formValues.image.file.name) : "No file selected" }
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
            <Button variant="contained" color="primary" startIcon={<Edit/>} onClick={() => setEdit(!edit)}>
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
                        <Box
                            className={classes.card}
                        >
                        <Avatar 
                            className = {classes.avatar}
                            sx={{ width: 150, height: 150 }}
                            alt = {user.firstName + " " + user.lastName}
                            src={UserImage ? UserImage : NoImage}
                        />
                        <br></br>
                        <Typography
                            align = "center"
                            variant="h1"
                            component="h1"
                        >
                            {user.firstName + " " + user.lastName}
                        </Typography>

                        </Box>
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