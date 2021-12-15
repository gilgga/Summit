const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Topic {
    Topic_Id: Id!
    Topicname: String!
    Description: String!
    Users_Enrolled: [Id]
    Courses: [Strings]
  }

  type Course {
    Course_Id: Id!
    Coursename: String!
    Description: String!
    Users_Enrolled: [Id]
    Topic: String
  }

  type Post {
    Post_Id: Id!
    Title: String!
    User_Posted: String!
    Time: String!
    Content: String
    Category: String
    Topic: [Id]
    Course: [Id]
  }


  type Query {
    getPosts: [Post]
    getTopics: [Topic]
    getCourses: [Course]
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      posts: [],
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
