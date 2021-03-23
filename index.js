const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers")
const { MONGO_URI } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Connection
try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  //Testing connection
  console.log(`MongoDB Connected`);
  return server.listen({ port: 5000 }).then((res) => {
    console.log(`Server running at ${res.url}`);
  });
} catch (err) {
  console.log(`Could not connect to MongoDB...`, err);
}
