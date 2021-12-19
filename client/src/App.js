import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Box from '@mui/material/Box';

import CourseFeed  from   './components/CourseFeed'
import Footer      from   './components/Footer';
import Landing     from   './components/Landing';
import Login       from   './components/Login';
import Logout      from   './components/Logout';
import Navbar      from   './components/Navbar';
import NewPost     from   './components/NewPost';
import NotFound    from   './components/NotFound';
import ProfilePage from   './components/Profile/ProfilePage';
import SignUp      from   './components/SignUp';
import TopicFeed   from   './components/TopicFeed';

import CoursePage  from   './components/CoursePage/CoursePage'
import TopicPage  from   './components/TopicPage/TopicPage'


import logo from './logo.svg';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});


function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Navbar/>
          <Box sx = {{ minHeight : "550px", paddingTop: "50px", paddingBottom: "50px", backgroundColor: "#f5f9fc" }}>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/logout" component={Logout}/>
              <Route exact path="/sign-up" component={SignUp}/>
              <Route exact path="/new-post" component={NewPost}/>
              <Route exact path="/user-profile/:id" component={ProfilePage}/>
              <Route exact path="/explore/courses" component={CourseFeed}/>
              <Route exact path="/explore/topics"  component={TopicFeed} />
              <Route exact path="/courses/:id"  component={CoursePage} />
              <Route exact path="/topics/:id"  component={TopicPage} />
              <Route exact path="/*" component={NotFound}/>
            </Switch>
          </Box>
          <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
