import { ApolloServer, gql } from "apollo-server";

// right side of colon is type of data
// "!" <= it means "non-nullable"
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
  },
};

// temporary database
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
