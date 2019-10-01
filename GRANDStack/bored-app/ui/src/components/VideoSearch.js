import React, {Component} from 'react';
import {Input,Item, Button} from 'semantic-ui-react';

class VideoSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.query
    };
  }

  setTitle = () => {
    this.props.setSearchTerm(this.state.value);
    console.log(this.state);
    console.log('1');
  };
  

  handleChange = (event) => {
    if (event) {
      this.setState({
        value: event.target.value

      })
    }
  };

  render() {
    const {value} = this.state;
    return(
      <Item>
    

      <Input
        onChange={this.handleChange}
        value={value}
        fluid
        placeholder="Video Title">
        <input />
        <Button onClick={this.setTitle}>Search</Button>

      </Input>


      </Item>
    )
  }
}


export default VideoSearch;