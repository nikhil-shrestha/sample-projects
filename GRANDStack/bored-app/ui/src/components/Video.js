import React, {Component} from 'react';
import { Item,Grid,Label } from 'semantic-ui-react';
import Iframe from 'react-iframe'



class Video extends Component {
  render() {
      //console.log(this.props)
      //console.log(this.props.videoid)
              //console.log(this.props.url)
         //console.log('this.props.url')
      const a = this.props.url
      //console.log(a)
      return(

      <Item>
        <Item.Image size="small" src={this.props.poster} bordered />
        <Item.Content verticalAlign="middle">
          <Item.Header>{this.props.title}</Item.Header>
          <Item.Meta>Year: {this.props.year}</Item.Meta>
          <Item.Description>{this.props.description}</Item.Description>
          <Item.Meta><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
           </Item.Meta><Label>Views: {this.props.views} </Label><Label>Comments: {this.props.comments} </Label><Item.Meta><Label>Likes: {this.props.likes}</Label><Label>Dislikes: {this.props.dislikes} </Label></Item.Meta>
          <Item.Meta>{this.props.videoid}</Item.Meta>

          <Iframe url={this.props.url}/>
 


          <Item.Extra>You might also like:
            <Grid columns={this.props.similar.length}>
              {this.props.similar.map(video => (
              <Grid.Column key={video.videoid}>
                <Item>
                  <Item.Image size="tiny" src={video.poster} bordered/>
                  <Item.Content>{video.title}</Item.Content>
                </Item>
              </Grid.Column>
              ))}
          </Grid></Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default Video;



