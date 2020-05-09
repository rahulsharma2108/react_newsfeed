import React from 'react';
import Home from './pages/home';
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