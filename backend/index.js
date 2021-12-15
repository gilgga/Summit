const { ApolloServer, gql } = require('apollo-server');
const {topics, courses, users, posts} = require("./data");

const seed = require("./data/seed");

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
      email: String!
      password: String!
      ) : User
  }

  type Mutation {
    createUser (
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ) : User
    enrollUserCourse (
      id: ID!
      courseid: ID!
    ) : User
    unenrollUserCourse (
      id: ID!
      courseid: ID!
    ) : User
    enrollUserTopic (
      id: ID!
      topicid: ID!
    ) : User
    unenrollUserTopic (
      id: ID!
      topicid: ID!
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
        const {email, password} = args;
        return await users.loginUser(email, password);
      }
    },
    Mutation: {
      createUser: async(_, args) => {
          const {email, password, firstName, lastName} = args;
          const newUser = await users.createUser(email, password, firstName, lastName);
          return newUser;
      },
      enrollUserCourse: async(_, args) => {
        const {id, courseid} = args;
        const newUser = await users.enrollCourse(id, courseid, true);
        return newUser;
      },
      unenrollUserCourse: async(_, args) => {
        const {id, courseid} = args;
        const newUser = await users.enrollCourse(id, courseid, false);
        return newUser;
      },
      enrollUserTopic: async(_, args) => {
        const {id, topicid} = args;
        const newUser = await users.enrollTopic(id, topicid, true);
        return newUser;
      },
      unenrollUserTopic: async(_, args) => {
        const {id, topicid} = args;
        const newUser = await users.enrollTopic(id, topicid, false);
        return newUser;
      },

    }
  };
async function seedDatabase() {
  try {
    console.log("seeding database");
    await seed();
    console.log("seeded database");  
  } catch (e) {
    console.log(e)
  }
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

seedDatabase();
