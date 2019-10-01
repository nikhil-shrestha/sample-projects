const { GraphQLServer } = require('graphql-yoga')
const { ApolloServer} =require('apollo-server')

const baseURL = `https://www.boredapi.com/api/activity`
const fetch = require('node-fetch')
const resolvers = require('./resolvers/resolvers')

const {restDefs}=require('./restql-schema')

const {neoDefs}=require('./graphql-schema')
const {makeExecutableSchema,mergeSchemas}=require('graphql-tools')

const neo4j = require('neo4j-driver').v1;
const { makeAugmentedSchema } =require("neo4j-graphql-js")


const driver = neo4j.driver(
  "bolt://52.91.116.38:39540",
  neo4j.auth.basic(
   "neo4j",
    "interrelation-discharges-overload"
  )
);


const restschema=makeExecutableSchema({
typeDefs:restDefs,
resolvers,
});

const neoschema = makeAugmentedSchema({
  typeDefs:neoDefs,
});

const schema = mergeSchemas({
   schemas: [
     restschema,
     neoschema
   ]
 });


const server = new ApolloServer({
  context:{driver},
  schema:schema,
  introspection: true,
  playground: true
});


const port=4000;
server.listen(port, "localhost").then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});