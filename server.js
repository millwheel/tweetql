import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    ping: String
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweet(){
      return tweets;
    }
    tweet() {
      console.log("Called.");
      return null;
    },
    ping() {
      return "pong";
    },
  },
};

const tweets = [
  {
    id: "1",
    text: "First one",
  },
  {
    id: "2",
    text: "Second one",
  },
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running: ${url}`);
});
