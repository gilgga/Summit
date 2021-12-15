const { ApolloServer, gql } = require('apollo-server');
const {topics, courses, users, posts} = require("./data");


const typeDefs = gql`

  type User {
    _id: ID!
    email: String!
    description: String
    firstName: String!
    lastName: String!
    topics: [ID]
    courses: [ID]
  }

  type Topic {
    _id: ID!
    title: String!
    description: String!
    usersEnrolled: [ID]
    courses: [ID]
  }

  type Course {
    _id: ID!
    title: String!
    description: String!
    usersEnrolled: [ID]
    topic: ID
  }

  type Post {
    _id: ID!
    title: String!
    user: String!
    time: String!
    content: String
    topic: [ID]
    course: [ID]
  }


  type Query {
    getTopics: [Topic]
    getCourses: [Course]
    getCourse(id: ID!) : Course
    getTopic(id: ID!)  : Topic
    loginUser(
      Email: String!
      Password: String!
      ) : User
  }

  type Mutation {
    createUser (
      Email: String!
      Password: String!
      First_Name: String!
      Last_Name: String!
    ) : User
  }
`;


const resolvers = {
    Query: {
      getTopics: async(_, args) => {
        return await topics.getTopics();
      },
      getCourses: async(_, args) => {
        return await courses.getCourses();
      },
      getCourse: async(_, args) => {
        let id = args.id;
        return await courses.getCourse(id);
      },
      getTopic: async(_, args) => {
        let id = args.id;
        return await topics.getTopic(id);
      },
      loginUser: async(_, args) => {
        const {Email, Password} = args;
        return await users.loginUser(Email, Password);
      }
    },
    Mutation: {
      createUser: async(_, args) => {
          const {Email, Password, First_Name, Last_Name} = args;
          return await users.createUser(Email, Password, First_Name, Last_Name);
      },
    }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
