
const neo4jgraphql=require("neo4j-graphql-js");


const neoDefs = `
type Video {
  query: String!  
  videoid: ID! 
  title: String
  year: Int
  description: String
  poster: String
  channel: String
  likes: Int
  dislikes: Int
  views: Int
  comments: Int
  url: String
  similar: [Video]
   @cypher(
      statement: "MATCH (u:Video) WHERE u.query=(this.query)  WITH u, rand() AS number RETURN u ORDER BY number LIMIT 3"    )
}



type Query {
  videosByTitle(subString: String): [Video]
    @cypher(
      statement: "MATCH (u:Video) WHERE u.query CONTAINS $subString RETURN u"
    )
}`;


module.exports={
	neoDefs,
}