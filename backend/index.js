const { ApolloServer, gql } = require('apollo-server');

// For Redis Caching
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const userCache = "userCache";
const postCache = "postCache";
const topicCache = "topicCache";
const courseCache = "courseCache"

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
    Topic: String!
  }

  type Post {
    Post_Id: Id!
    Title: String!
    User_Posted: String!
    Time: String
    Content: String!
    Topic: Id
    Course: Id!
  }

  type Query {
    getPosts: [Post]
    getTopics: [Topic]
    getCourses: [Course]
  }

  type Mutation {
    createPost(
      Title: String!, 
      User_Posted: String!, 
      Content: String!,
      Course: Id!): Post
    createTopic(
      Topicname: String!, 
      Description: String!): Topic
    createCourse(
      Coursename: String!, 
      Description: String!): Course
    updatePost(
      Post_Id: Id!, 
      Title: String!,
      User_Posted: String!,
      Time: String,
      Content: String!,
      Topic: Id,
      Course: Id!): Post
    updateTopic(
      Topic_Id: Id!,
      Topicname: String!,
      Description: String!,
      Users_Enrolled: [Id],
      Courses: [Strings]): Topic
    updateCourse(
      Course_Id: Id!,
      Coursename: String!,
      Description: String!,
      Users_Enrolled: [Id],
      Topic: String!): Course
    deletePost(Post_Id: Id!): Post
    deleteTopic(Topic_Id: Id!): Topic
    deleteCourse(Course_Id: Id!): Course
  }
`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getPosts: async (_, args) => {
      return [];
    },
    getTopics: async (_, args) => {
      return [];
    },
    getCourses: async (_, args) => {
      return [];
    }
  },
  Mutation: {
    createPost: async (_, args) => {
      return [];
    },
    createTopic: async (_, args) => {
      return [];
    },
    createCourse: async (_, args) => {
      return [];
    },
    updatePost: async (_, args) => {
      return [];
    },
    updateTopic: async (_, args) => {
      return [];
    },
    updateCourse: async (_, args) => {
      return [];
    },
    deletePost: async (_, args) => {
      return [];
    },
    deleteTopic: async (_, args) => {
      return [];
    },
    deleteCourse: async (_, args) => {
      
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
