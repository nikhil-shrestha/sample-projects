import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import {Image,Button,Card} from 'semantic-ui-react';
import doit from './assets/images/doit.png'; 
import char from './assets/images/char.png'; 
import cook from './assets/images/cook.png'; 
import educ from './assets/images/educ.png'; 
import musi from './assets/images/musi.png'; 
import hard from './assets/images/hard.png'; 
import rela from './assets/images/rela.png'; 
import soci from './assets/images/soci.png'; 
import recr from './assets/images/recr.png'; 



const FEED_ACTIVITY_QUERY = gql`
     query ActivityTypeData($activity: String!)  {
          types: recreationByType(type: $activity) {
              type
              activity             
              accessibility
              price
              participants            
          }
      }
`

class Activity extends Component {


  state = {
  activity:'',
  type:''
  }

  render() {
    return (  


<div>
      <Card.Group itemsPerRow={3}>
      <Card>
          <Image src={doit} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Learn what you can do
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'onClick={() => this._executeActivitySearch("diy")}>
                  diy
                </Button>        
              </div>
            </Card.Content>
        </Card>

           <Card>
          <Image src={cook} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Dive into Food
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                 <Button basic color='grey'onClick={() => this._executeActivitySearch("cooking")}>
                  cook
                </Button>        
              </div>
            </Card.Content>
        </Card>

         <Card>
          <Image src={char} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Find a cause
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'onClick={() => this._executeActivitySearch("charity")}>
                  charity
                </Button>        
              </div>
            </Card.Content>
        </Card>


           <Card>
          <Image src={soci} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Explore your community
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
               <Button basic color='grey'onClick={() => this._executeActivitySearch("social")}>
               social
                </Button>        
              </div>
            </Card.Content>
        </Card>


        <Card>
          <Image src={recr} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Get out and Excercise
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
               <Button basic color='grey'onClick={() => this._executeActivitySearch("recreational")}>
                  recreation
                </Button>        
              </div>
            </Card.Content>
        </Card>

          <Card>
          <Image src={rela} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Take a mindful break
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'onClick={() => this._executeActivitySearch("relaxation")}>
                  relaxation
                </Button>        
              </div>
            </Card.Content>
        </Card>

             <Card>
          <Image src={musi} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
            Music for your soul
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
               <Button basic color='grey'onClick={() => this._executeActivitySearch("music")}>
                  music
                </Button>        
              </div>
            </Card.Content>
        </Card>

             <Card>
          <Image src={hard} wrapped ui={false} />            
          <Card.Content>           
            <Card.Meta>
             Take action today
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                 <Button basic color='grey'onClick={() => this._executeActivitySearch("busywork")}>
                  busywork
                </Button>        
              </div>
            </Card.Content>
        </Card>

             <Card>
          <Image src={educ} wrapped ui={false} />            
         <Card.Content>           
            <Card.Meta>
              Learn a new skill
            </Card.Meta>
          </Card.Content>

             <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'onClick={() => this._executeActivitySearch("education")}>
                  education
                </Button>        
              </div>
            </Card.Content>
        </Card>


      </Card.Group>
</div>
   
        );
  }

  _executeActivitySearch =  async (activity) => { 

    //console.log(activity);

    const result = await this.props.client.query({
      query: FEED_ACTIVITY_QUERY,
      variables: { activity },
    })

     const activity2 = result.data.types.activity
     //this.setState({activity:activity2});


     console.log("Bored api");
     console.log(result);
     console.log(activity2);



     //localStorage.clear();
     localStorage.setItem('activity', activity2);


     this.props.client.resetStore().then(() => {
     this.props.history.push('/search')

    }) 
 



   };
    
}


export default withApollo(Activity)
