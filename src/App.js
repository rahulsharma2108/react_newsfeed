import React from 'react';
import Home from './compoenents/Home/Home';
import {Switch,Route} from 'react-router';

export default class App extends React.Component{
  
    render(){
        return(
        <Switch>
            <Route path="/" render={props=>(
                <Home {...props}/>
            )}>
            </Route>
        </Switch>
        );
    }
}