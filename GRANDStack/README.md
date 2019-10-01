# GRANDStack  Application

## Tech stack
This tutorial would help you to build a grand stack application which involves Neo4J graph database, GraphQL and React. The final outcome of this tutorial would be similar to this https://bored-app.mailtodavidjegan.now.sh/


## Idea

A video recommender acting as an intermediate between Youtube and you to kill your boredom. The product acts like an abstract video streaming platform. 


## Architecture 
[![N|Solid](https://findceleb1.s3-us-west-2.amazonaws.com/img/ArchitectureGRAND.png)](https://raw.githubusercontent.com/SSMalvika/CodeBuffalo-2019/master/assets/img/Architecture.png)


## Methodology

### Data 
  - Sources: Google Youtube data  API was used to aggregate the data. The API is listed below and just hitting with proper credential produces rich data about the video, like video views, comments, likes, dislikes, posted time etc.  
  
  ```sh
https://www.googleapis.com/youtube/v3/search?part=snippet&q=Best of AR Rahman Songs&key=<APIKEY>&type=video&maxResults=1
https://www.googleapis.com/youtube/v3/videos?part=statistics&id=dCVo8TkvuTM&key=<APIKEY>
```

After polling the Youtube API, save those results in Google Sheets to facilitate easy download into Neo4J.  

### Neo4J Database

[![N|Solid](https://findceleb1.s3-us-west-2.amazonaws.com/img/DB1.png)](https://findceleb1.s3-us-west-2.amazonaws.com/img/DB1.png)

We'll make use of the Neo4j 3.5 Blank Sandbox, which is populated with the youtube dataset.



The above is Neo4J DB Engine. The CYPHER queries used to populate the DB is provided 

#### Cypher Queries
```
#Load csv
LOAD CSV WITH HEADERS FROM <googlesheet path> AS row FIELDTERMINATOR ',' CREATE (:Video {videoid: row.videoid});
LOAD CSV WITH HEADERS FROM <googlesheet path> AS row FIELDTERMINATOR ',' CREATE (:Limiter {limiterid: row.limiterid});

#Create Index
CREATE INDEX ON :Video(videoid);
CREATE INDEX ON :Limiter(limiterid);


LOAD CSV WITH HEADERS FROM <googlesheet path> AS row FIELDTERMINATOR ',' MATCH (video:Video {videoid: row.videoid}) MATCH (limiter:Limiter {limiterid: row.query}) MERGE (limiter)-[:GIVES {similar: row.similar}]->(video);
MATCH path = (bq:Limiter)-[:GIVES]->(v:Video) WHERE bq.limiterid ='Make a bucket list' RETURN v.videoid
LOAD CSV WITH HEADERS FROM <googlesheet path> AS row FIELDTERMINATOR ',' MATCH (video:Video {videoid: row.videoid}) SET video.month = row.month RETURN video.videoid, video.month

#Simlar Videos
MATCH path = (bq:Limiter)-[:GIVES]->(v:Video) WHERE bq.limiterid ='Make a bucket list' RETURN distinct v.videoid, v.title, gives.similar as similarity ORDER BY similarity DESC  LIMIT 5

#Recommendation
MATCH (bq1:Limiter)-[gives:GIVES]->(v3:Video) WHERE bq1.limiterid =~'Make a bucket list' WITH [i in v3.videoid | i] as video MATCH path = (bq:Limiter)-[gives:GIVES]->(v1:Video)-[s:SIMILAR]->(v2:Video) WHERE bq.limiterid =~'Make a bucket list' and not v2.videoid in video RETURN distinct v2.videoid as videoid, v2.title as title, gives.similar as similarity ORDER BY similarity DESC  LIMIT 5


```

Following only these commands would result in exact replication of our DB and the GraphQL commands would be compatible with their DB as well.




#### Recommended Movies
For a given video, what are other video that someone who likes that video also likely to enjoy? 
```sh
MATCH ... ... RETURN ... ORDER BY score DESC ...
```




### GraphQL

We have used apollo graphql server and client to connect with the database and REST API endpoints . 

#### Graphql on the SERVER Side:

 - On the server side we are integrating two different sources one from REST API and another from Neo4j Database. We are using query and query stitching for integrating both the schemas into a single graphql endpoint.
 - For NEO4J query, we are using the neo4j-graphql-js to write queries in the Cypher Language  inside the graphql schema definitions.






The first step is to define a GraphQL schema using the GraphQL IDL / schema syntax. We define a simple schema with a single type and a single Query type:

* graphql-schema.js *
```sh
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
}


```



Converting REST API to GraphQL solves the issues like N+1-problem, overfetching and slow iteration cycles. Next we wanted to combine both the schemas together so they can be served in a single endpoint, we used Schema Stiching and merged the schemas as one. We observe that one Graphql playground has both REST API and Neo4J DB simultaneously, as shown in the images below


![N|Solid](https://findceleb1.s3-us-west-2.amazonaws.com/img/G1.png)






####  Running locally


```sh
npm install
npm start
```


Install dependencies. Set Neo4j connection string and credentials in `.env`.Start the GraphQL service. This will start the dev web server at http://127.0.0.1:4000/ depending on your system port availability. Now the Server is ready to deployed to Zeit Now




#### Testing 

Run the following schemas to get required results 

```
1.

{
	bored
  {
	    activity 
  	    type
    	accessibility
      	price	
	    participants
  	    link
    	key
  }
}


2.

 {
    videos: videosByTitle(subString: "Create a compost pile") {
              title
              videoid
              description
              poster
              year
              similar {
	              	title
             	 	videoid
	              	description
             	 	poster
             	 	year
              }
          }
      }
```


### React 

The React app acts like a random choice selector for the choice of the user (Illusion of choice). The user can choose a category and random boredom killing videos would be populated in the next page. 

[![N|Solid](https://findceleb1.s3-us-west-2.amazonaws.com/img/r1.png)](https://findceleb1.s3-us-west-2.amazonaws.com/img/r1.png)

This is the comprehensive look and feel of the app. There would be multitudes of random videos that has selective information like title, description, relative freshness(year), Likes, dislikes, views, comments etc. The React-Iframe has the capability to play video within the virtual platform. Also, most likely recommendable videos are populated in the lower part of the video. 


#### Components - Explanation

The React has  App is composed of VideoSearch and VideoList components. In the constructor for App we set state to contain our initial search title. We then define setSearchTerm(title) function which updates the App component's state



```
constructor(props) {
    super(props);
    this.state = {
      title: 'Wash your car'
    }
  }
  ........
render() {
    const {title} = this.state;
    return (
      <div>
        <VideoSearch setSearchTerm={this.setSearchTerm} title={title} />
        <VideoList title={title} />
      </div>
    );
  }
```
As this state is changed, the component hierarchy is re-rendered, ensuring each component updates as the data is updated.

 - Video - UI for displaying movie details
 - VideoList - renders a list of Video components
 - VideoSearch - handle new search input
 - App - for the overall hierarchy
 - Index - entry point of this world


####  Running locally

```sh
cd bored-app/ui/
npm install
npm start
```

This might start the dev web server at http://localhost:3001 or at http://localhost:3000 depending on your system port availability



## Conclusion

That the end of this session. You would have created the application now. In the next article we would see more complexities like mutation and authentication. 
