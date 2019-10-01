//Connecting to Bored API and creating Graphql

const baseURL = `https://www.boredapi.com/api/activity`
const fetch = require('node-fetch')


module.exports={
    Query: {   
     bored: () => {
      return fetch(`${baseURL}`).then(res => res.json())
    },
    recreationByType: (parent, args) => {
      const { type } = args
      return fetch(`${baseURL}?type=${type}`).then(res => res.json())
    }    
  },
}

