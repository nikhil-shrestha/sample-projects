

const restDefs = `
type Recreation {
  activity:String
  accessibility: Float
  type: String
  participants: Int
  price: Float
  link: String
  key: String
}

type Query {
  bored: Recreation!
  recreationByType(type: String!): Recreation
}
`;


module.exports={
	restDefs,
}