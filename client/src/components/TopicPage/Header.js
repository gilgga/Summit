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
    const defaultValues = {
        description: "",
        image: null,
    };
    const authorized = true;

    const classes =  useStyles();

    const [edit, setEdit] = useState(false);    
    const [formValues, setFormValues] = useState(defaultValues);
    const [invalidEdits, setInvalidEdits] = useState(true);
    const [formChange, setFormChange] = useState(false);
    const [testImage, setTestImage] = useState(null);
    //const [editDescription] = useMutation(queries.EDIT_DESCRIPTION);
    
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

    /*const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data }= await editDescription({variables: {id: "61bca759d6471ee0af05987e", description: formValues.description, image: formValues.image.encoded}});
            console.log(data);
            setTestImage(data && data.editDescription.image);
        } catch (e) {
            console.log(e);
        }

        setFormChange(false);
    };*/


    useEffect(() => {
        if (!formChange) {
            setInvalidEdits(true);
        } else {
            setInvalidEdits(false);
        }
    }, [formChange]);

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
                    <Card className={classes.card} variant="outlined">
                        <CardContent

                            className = {classes.h1}
                        >
                            <Typography
                                align = "center"
                                variant="h1"
                                component="h1"
                            >
                                {topic.title}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                    {EditButton}
                </Grid>
            </Container>
        </>
    );
}

export default Header;