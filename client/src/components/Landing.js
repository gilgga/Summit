import logo from '../img/Summit.jpg';


const Landing = () => {
    // const {loading, error, data} = useQuery(queries.LOGIN_USER, {variables: {email: "jdoe@example.com", password: "password"}})
    // const [createMutation] = useMutation(queries.CREATE_USER);
    // console.log(data);    
    // console.log(error)
    return (
        <div style={{ textAlign: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
            <img src={logo} alt="Summit Logo"/>
            <p>Summit is a platform that allows self-paced learners to engage with a community of students. In the pursuit of self-learning through online course platforms, the alienation of the process can be daunting. Engaging with a network of fellow users can create a more engaging experience, allowing for sustained progress in course material.</p>
        </div>
    );
}
export default Landing;