import react from "react";
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Landing from './components/Landing';
import ProfilePage from './components/Profile/ProfilePage';

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
      {/* Maybe a navbar or something */}
      <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/user-profile/:id" component={ProfilePage}/>
      </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
