const { ApolloServer, gql } = require('apollo-server');
const {topics, courses, users, posts} = require("./data");

const seed = require("./data/seed");

// For Redis Caching
// const bluebird = require('bluebird');
// const redis = require('redis');
// const client = redis.createClient();

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

const userCache = "userCache";
const postCache = "postCache";
const topicCache = "topicCache";
const courseCache = "courseCache"


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
    getPost(id: ID!) : Post
    getPosts: [Post]
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

  type Mutation {
    createPost(
      title: String!, 
      user: String!, 
      content: String!,
      course: ID!
    ): Post
    createTopic(
      title: String!, 
      description: String!
    ): Topic
    createCourse(
      title: String!, 
      description: String!
    ): Course
    updatePost(
      _id: ID!, 
      title: String!,
      user: String!,
      time: String,
      content: String!
    ): Post
    deletePost(Post_Id: ID!): Post
  }
`;


const resolvers = {
    Query: {
      getPost: async (_, args) => {
        return [];
      },
      getTopics: async (_, args) => {
        return await topics.getTopics();
      },
      getCourses: async (_, args) => {
        return await courses.getCourses();
      },
      getCourse: async (_, args) => {
        let id = args.id;
        return await courses.getCourse(id);
      },
      getTopic: async (_, args) => {
        let id = args.id;
        return await topics.getTopic(id);
      },
      loginUser: async (_, args) => {
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
