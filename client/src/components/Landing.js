import react, { useEffect } from 'react';
import {  useQuery, useMutation } from '@apollo/client';
import queries from '../queries';


const Landing = () => {
    // const {loading, error, data} = useQuery(queries.LOGIN_USER, {variables: {email: "jdoe@example.com", password: "password"}})
    // const [createMutation] = useMutation(queries.CREATE_USER);
    // console.log(data);    
    // console.log(error)
    return "This is a landing page";
}
export default Landing;