import react from "react";
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Box from '@mui/material/Box';

import CourseFeed  from   './components/CourseFeed'
import Footer      from   './components/Footer';
import Landing     from   './components/Landing';
import Navbar      from   './components/Navbar';
import NotFound    from   './components/NotFound';
import ProfilePage from   './components/Profile/ProfilePage';
import TopicFeed   from   './components/TopicFeed';


import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
      <Box sx = {{ minHeight : "850px" }}>
        <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/user-profile/:id" component={ProfilePage}/>
          <Route exact path="/explore/courses" component={CourseFeed}/>
          <Route exact path="/explore/topics"  component={TopicFeed} />
          <Route exact path="/*" component={NotFound}/>
        </Switch>
        </Router>
      </Box>
      <Footer/>
    </ApolloProvider>
  );
}

export default App;
