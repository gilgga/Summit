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
    image: String
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
    topic: ID
    course: ID
  }

  type Query {
    getUser(userid: ID!) : User
    getUserCourseDetails(userid: ID!) : [Course]
    getUserTopicDetails(userid: ID!) : [Topic]
    getPosts: [Post]
    getPost(id: ID!) : Post
    getPostsFromUser(userid: ID!) : [Post]
    getPostsFromTopic(topicid: ID!) : [Post]
    getPostsFromCourse(courseid: ID!) : [Post]
    getTopic(id: ID!)  : Topic
    getTopics: [Topic]
    getTopicCourses(id: ID!): [Course]
    getCourses: [Course]
    getCourse(id: ID!) : Course
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
    createPost (
      user: String!
      title: String!
      time: String!
      content: String!
      course: ID!
      topic: ID!
    ) : Post
    editProfile (
      id: ID!
      description : String
      image: String
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
      getUser: async (_, args) => {
        let userid = args.userid;
        return await users.getUser(userid);
      },
      getUserCourseDetails: async (_, args) => {
        let userid = args.userid;
        return await users.getUserCourseDetails(userid);
      },
      getUserTopicDetails: async (_, args) => {
        let userid = args.userid;
        return await users.getUserTopicDetails(userid);
      },
      getPosts: async (_, args) => {
        return await posts.getPosts();
      },
      getPost: async (_, args) => {
        let id = args.id;
        return await posts.getPost(id);
      },
      getPostsFromUser: async (_, args) => {
        let userid = args.userid;
        return await posts.getPostsFromUser(userid);
      },
      getPostsFromTopic: async (_, args) => {
        let topicid = args.topicid;
        return await posts.getPostsFromTopic(topicid);
      },
      getPostsFromCourse: async (_, args) => {
        let courseid = args.courseid;
        return await posts.getPostsFromCourse(courseid);
      },
      getTopics: async (_, args) => {
        return await topics.getTopics();
      },
      getTopic: async (_, args) => {
        let id = args.id;
        return await topics.getTopic(id);
      },
      getTopicCourses: async (_, args) => {
        let id = args.id;
        return await courses.getTopicCourses(id);
      },
      getCourses: async (_, args) => {
        return await courses.getCourses();
      },
      getCourse: async (_, args) => {
        let id = args.id;
        return await courses.getCourse(id);
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
      editProfile: async(_, args) => {
          const {id, description, image} = args;
          const newUser = await users.editProfile(id, description, image);
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
      createPost: async(_, args) => {
        const {title, user, time, content, topic, course} = args;
        return await posts.addPost(title, user, time, content, topic, course);
      }
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
