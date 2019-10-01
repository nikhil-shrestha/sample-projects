# Neo4J - Certification 

![alt text](https://github.com/davidjegan/serverlessguru-david/blob/master/Neo4J-Intro/img/logo.png)




Hello! This article would assist you to take on the Neo4J certification, as this addresses major topics. 

## What is Neo4J ?


-	**Neo4j**  is used to store, map, analyze and traverse networks of connected data to reveal invisible contexts and hidden relationships. 
-	It is thus a Graph database, and does not use relational schema objects and is also ACID compliant. 



**Neo4j Access** 
-

-	The graph DB can be accessed via browser or can be installed locally (Neo4j browser and Neo4j desktop) respectively. 
-	Neo4j bloom assists to perform some advanced visualization of data. 
-	Apart from doing visualization manually, there are driver support available for languages like Python, Go and Java etc. to do visualization in a programmatic manner. 


**Neo4j Browser**

- The Database present in a running instance can be accessed through a web browser
- We can only connect to a single database instance at time
- The Neo4j Sandbox can be created, over the Internet, in-order to work with the Database, This is a temporary Neo4j instance that is available for 3 days, but you can extend it to 10 days.


![alt text](https://github.com/davidjegan/serverlessguru-david/blob/master/Neo4J-Intro/img/desk.png)

- Bolt protocol is used by applications to Neo4J db
- The visualizations can be exported in PNG, SVG and CSV format


**Neo4j Desktop**
- By default, APOC, Graph Algorithms, and GraphQL are available to your Neo4j Desktop projects. 
	- APOC is a library that provides hundreds of procedures and functions.
	- Graph Algorithms 
		- Path Finding – these algorithms help find the shortest path/availability/quality of routes
		- Centrality – these algorithms determine the importance of distinct nodes in a network
		- Community Detection – these algorithms evaluate how a group is clustered or partitioned
		- Similarity – these algorithms help calculate the similarity of nodes


![alt text](https://github.com/davidjegan/serverlessguru-david/blob/master/Neo4J-Intro/img/desk1.png)

- We can create multiple projects, each with their own database or set of databases, but only one database can be started at a time.

**Neo4J - Local to Web**
1) From Neo4j Desktop, we can open Neo4j Browser. This is done by clicking  `<your project name>`  in the Desktop screen, then click  `Manage`  on our database.

2) We can also access this from a regular browser window by typing  [http://localhost:7474](http://localhost:7474/)  and signing in with Username: neo4j, Password: `"your database password"`



**Loading data into DB**

We can utilized one among these available options
-	Execute LOAD CSV statements in Cypher.
-	APOC library -  import procedures
-	Use the neo4j-import tool
-	Use the Neo4j ETL tool to map data from relational databases and load into Neo4j

**License**
Open-source license and a commercial license which includes technical support is available.



## Cypher Query Language


Cypher is Neo4j’s graph query language that allows users to store and retrieve data from the graph database. 

> **Cypher’s syntax** provides a visual and logical way to match patterns of nodes and relationships in the graph. It is a declarative, SQL-inspired language for describing visual patterns in graphs using ASCII-Art syntax. It allows us to state  what we want to select, insert, update, or delete from our graph data without a description of exactly  how to do it. Through Cypher, users can construct expressive and efficient queries to handle needed create, read, update, and delete functionality.
	
	Example
	
	//data stored with this direction. Create Operation
	CREATE (p:Person)-[:LIKES]->(t:Technology)

	//query relationship backwards will not return results
	MATCH (p:Person)<-[:LIKES]-(t:Technology)
	
	//better to query with undirected relationship unless sure of direction	
	MATCH (p:Person)-[:LIKES]-(t:Technology)

	//Return all persons name
	MATCH (p:Person) RETURN p.name
	
	//Alias persons name into 'Employees_name'
	MATCH (p:Person) RETURN p.name AS Employees_name
	
	//Update a parameter using SET
	MATCH (p:Person {name: 'Jane'}) SET p.birthdate = date('1990-12-12') RETURN p.name
	
	// Unroll list and return distinct elements
	WITH [1, 1, 2, 2] AS coll UNWIND coll AS x WITH DISTINCT x RETURN collect(x) AS setOfVals
	
	// Count - null vs not null
	COUNT(*)  :- counts rows, not values
	COUNT(n)  :- does not count null values

	// Merge either matches existing nodes and binds them, or it creates new data and binds that.
	//Merge is like combination of create and match
	MATCH (p:Person) MERGE (c:City { name: p.bornIn }) RETURN p



## Data Model

![alt text](https://github.com/davidjegan/serverlessguru-david/blob/master/Neo4J-Intro/img/desk2.png)


The four building blocks of a Neo4j Graph Database are
-	Nodes
-	Relationships
-	Properties
-	Labels
	
**Nodes**
In a Neo4j database, what are nodes are used to represent entities and complex value types in the graph. Two nodes can be connected by more than one relationship


**Relationships**
Nodes are connected by relationships. Thus Foreign keys are not needed to decide which nodes are related

- Relationship is a  structure with a name and direction that describes the connection between two nodes 
- It provides structure and context to the graph
- So according to this logic, a single node can have a relationship that points at itself
- Direction is required when creating a relationship, but not when querying a relationship
- Finally, if nodes have relationships attached to them, they cannot be deleted

**Labels**
- Labels are a tags that are used to group nodes into sets, representing them as entities
- They are used to apply constraints within group of nodes


**Properties**
- Properties are the key-value pairs used for nodes and relationships.
- Property values can be Numbers, byte, boolean, string, array of string or date
- Automatic indexing of nodes occurs when a label is added to a node, but the indexing of properties only occurs if you explicitly add an index or constraint to a property.
- Neo4j does not enforce by default that all nodes with the same label must have the same property keys



## Conclusion

Well, there you have it! A beginner article to start with Neo4J. More interactive workspaces to be added in the subsequent articles. 

Just try how good you fare after reading this article using this link https://neo4j.com/graphacademy/neo4j-certification/. 


**Reference**
- [https://neo4j.com/developer/graph-database/](https://neo4j.com/developer/graph-database/)
- [https://neo4j.com/labs/](https://neo4j.com/labs/)
- [https://neo4j.com/developer/](https://neo4j.com/developer/)
- [https://neo4j.com/graphacademy/online-training/introduction-to-neo4j/part-2/](https://neo4j.com/graphacademy/online-training/introduction-to-neo4j/part-2/)
