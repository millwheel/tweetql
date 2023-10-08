import { ApolloServer, gql } from "apollo-server";

// right side of colon is type of data
// "!" <= it means "non-nullable"
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    // first argument should be root
    // parameters always go into second argument of bracket
    tweet(root, args) {
      const { id } = args;
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(root, args) {
      const { text, userId } = args;
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, { id }) {
      const indexToDelete = tweets.findIndex((tweet) => tweet.id === id);
      if (indexToDelete === -1) return false;
      tweets.splice(indexToDelete, 1);
      return true;
    },
  },
  User: {
    // root has the type instance of itself.
    fullName(root) {
      const { firstName, lastName } = root;
      return `${firstName} ${lastName}`;
    },
  },
};

// temporary database
let tweets = [
  {
    id: "1",
    text: "First one",
  },
  {
    id: "2",
    text: "Second one",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "asme",
  },
  {
    id: "2",
    firstName: "eson",
    lastName: "lock",
  },
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running: ${url}`);
});
