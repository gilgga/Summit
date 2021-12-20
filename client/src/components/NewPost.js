import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import { 
    Button, 
    CircularProgress, 
    Grid, 
    MenuItem,
    InputLabel,
    FormHelperText,
    FormControl,
    Select,
    Snackbar,
    TextField, 
    Typography
} from '@mui/material';

import queries from '../queries';

const defaultValues = {
    time: "",
    course: "",
    user: "",
    content: "",
    topic: ""
}

const NewPost = (props) => {
    const {data, loading, error} = useQuery(queries.GET_COURSES);
    const [open, setOpen] = useState(false);
    const [newPost] = useMutation(queries.CREATE_POST);
    const [formValues, setFormValues] = useState(defaultValues);
    const [courseSelect, setcourseSelect] = useState("");
    const [topicSelect, settopicSelect]   = useState("");
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [validForm, setValidForm] = useState(false);
    const allState = useSelector((state) => state.user);


    useEffect(() => {
        if (courseSelect && content && title) {
            setValidForm(true);
        } 
    },[courseSelect, content, title])
    
    const handlecourseSelect = (e) => {
        const {
            target: { value },
          } = e;
        setcourseSelect(value);
        settopicSelect(value.topic);
    }
    const handleTextChange = (e) => {
        let {id, value, name} = e.target;
        if (id === "content") {
            setContent(value)
        } else {
            setTitle(value);
        }
        setFormValues({
            ...formValues,
            [id] : value
        });
    };
    const submitPost = (e) => {
        e.preventDefault();
        const values = {
            ...formValues,
            time: new Date(),
            course: courseSelect._id,
            topic:  topicSelect,
            user: allState._id
        }
        newPost({variables: values}).then((data, err) => {
            if (data) {
                setOpen(true);
                setcourseSelect('');
                settopicSelect('');
                setFormValues(defaultValues);
                setContent('');
                setTitle('');
                setValidForm(false);
            } else if (err) {
                console.log(err);
            }
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    if (loading) {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>
				<CircularProgress/>
			</Grid>
		);
    }
    else {
    return (
            <>
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Typography variant="h4">
                        Create a New Post
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                <form id="post-form" onSubmit={submitPost}>        
                        <TextField
                            onChange={handleTextChange}
                            id="title"
                            label="Title"
                            placeholder="Enter a title"
                            variant="standard"
                            value={title}
                            required
                            fullWidth
                        ></TextField>
                    

                        <TextField
                            onChange={handleTextChange}
                            id="content"
                            label="Content"
                            value={content}
                            placeholder="What did you want others to know?"
                            variant="standard"
                            required
                            multiline
                            fullWidth
                            maxRows={4}
                        >
                        </TextField>
                        <Grid 
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            spacing={3}
                        >
                        <Grid item>
                            <InputLabel 
                                htmlFor="grouped-native-select"
                            >
                                Course
                            </InputLabel>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <Select
                                    required
                                    label="Course"
                                    inputProps={{
                                        name: 'courses',
                                        id: 'course',
                                    }}
                                    defaultValue=""
                                    value={courseSelect}
                                    id="course"
                                    onChange={handlecourseSelect}
                                    autoWidth
                                >   
                                    {data && data.getCourses.map((course) => {
                                        return <MenuItem key={course._id} style={{whiteSpace: 'normal'}} value={course}>{course.title}</MenuItem>
                                            
                                    })}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                            </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={{margin:'8px 0'}}
                                disabled={!validForm}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Post created"
            />
        </>
        )
    }
};

export default NewPost;