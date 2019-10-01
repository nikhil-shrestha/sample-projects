import React from "react";
import { Item } from "semantic-ui-react";
import { graphql} from "react-apollo";
import gql from "graphql-tag";
import Video from "./Video";
import {Component} from "react";

class VideoList extends Component {

  render() {

    const {data} = this.props;
    //console.log(data);

    if (data.loading) return <div>Loading...</div>;
    if (data.error) {
      console.log(data);
      console.log(data.error);
      return <div>Error!</div>;
    }
    if (data.videos.length === 0) return <div>No videos!</div>;

    return (
      <Item.Group divided>
        {data.videos.map(video => (
          <Video
            key={video.videoid}
            title={video.title}
            poster={video.poster}
            similar={video.similar}
            likes={video.likes}
            url={video.url}
            dislikes={video.dislikes}
            views={video.views}
            comments={video.comments}
            description={video.description}
            year={video.year}
          />
        ))}
      </Item.Group>
    );

  }


};



console.log('Video called')
const VideoListWithData = graphql(
  gql`
     query VideoListWithData($query: String)  {
          videos: videosByTitle(subString: $query) {
              title
              videoid
              poster
              year
              url
              likes
              description
              dislikes
              comments
              views
              query
              similar {
                  videoid
                  poster
                  title
              }
          }
      }
  `

)(VideoList);

export default VideoListWithData;
