import React, { Component } from 'react';
import VideoSearch from './VideoSearch';
import VideoList from './VideoList';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: 'Wash your car'
       
    }
  }

  setSearchTerm = (query) => {
    this.setState({query});
    console.log("setSearchTerm called");
    console.log(this.state.query);

  };

  render() {

   const querydat=localStorage.getItem('activity');
    let {query} = this.state;  
    if(querydat)
    {
       query=querydat;
       //localStorage.removeItem('activity');
        localStorage.clear();
    }

    return (
      <div>       
        <VideoSearch setSearchTerm={this.setSearchTerm} query={query}/>
         <VideoList query={query} />
      </div>

    )
  }

}

export default App;