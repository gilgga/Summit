import react from 'react';
import ImageBox from './ImageBox';

const exampleUser = {
    _id: 1234,
    username: "TestUsername",
    email: "test@test.com",
    firstName: "Your",
    lastName: "Mum",
    description: "This is a description of me!",
}

const usertopics = [];
const usercourses = [];

const ProfilePage = () => {
    return (
        <>
            <ImageBox user={exampleUser}/>
        </>
    )
}

export default ProfilePage;