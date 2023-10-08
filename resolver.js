import users from "./userdb.js";
import tweets from "./tweetdb.js";

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
      if (!users.find((user) => user.id === userId)) {
        throw new Error("User doesn't exist.");
      }
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
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
  Tweet: {
    author(root) {
      const { userId } = root;
      return users.find((user) => user.id === userId);
    },
  },
};

export default resolvers;
