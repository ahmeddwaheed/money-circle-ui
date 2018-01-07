import React, { Component } from 'react';
import Pool from '../Pool';
import history from '../../history';
import {UserHeader} from '../../Containers/UserCardContainer/nav_bar';



// const Search = Input.Search;
//
export default class Pools extends Component {
    constructor(props){
        super(props);
        this.state = {
          value:""
        }
    }
    change = (event) => {
      this.props.getPools(event.target.value);
      this.setState({value: event.target.value});
    }
    componentWillMount(){
      if(this.props.currentUser){
        this.props.getPools(this.state.value);
      }
    }
    render(){
        const { pools, loading , currentUser, isUser , isAdmin } = this.props;
        if(isUser || isAdmin){
          return (
            <div>
                  {
                    isUser? 
                    <UserHeader />
                    :
                    null
                  }
                    <h1>HI {currentUser.name}</h1>
                    <select name = "pools" id = "pools" onChange = {this.change} value ={this.state.value}>
                      <option value = "" >All</option>
                      <option value = "comming">comming</option>
                      <option value = "running">running</option>
                    </select>
                    {pools.map((pool) => {
                      return (
                      <Pool isAdmin= {isAdmin} isUser= {isUser} pool={pool} onClick={this.props.deletePool.bind(this)} />
                      )
                    })
                   }
  
              </div>
          )
        }
        else {
          history.push('/login'); 
          return null
        }
    }
}
