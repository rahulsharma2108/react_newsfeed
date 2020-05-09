import React from 'react';

import Header from './Header';
import home from './home.css';
import FeedsList from './FeedsList';
import Footer from './Footer';
import LineGraph from './LineGraph';


export default class Home extends React.Component{
    constructor(props){
        super(props);
        let data = [];
        let page;
        if(props.staticContext){
            data = props.staticContext.hits;
            page= parseInt(props.staticContext.page)+1;
        }else{
            data = window.__storiesList__;
            page = parseInt(window.__page__)+1;
            delete window.__storiesList__;
            delete window.__page__;
        }
        this.state = {storiesList:data,page}
       
    }
    render(){
        return (
            <div className={'container'}>
            <Header />
            <FeedsList storiesList={this.state.storiesList}/>
            <a href={`/?page=${this.state.page}`}>More</a>

            <LineGraph storiesList={this.state.storiesList}></LineGraph>
            {/*Footer/> */}
            </div>
        );
    }
}

// https://www.youtube.com/watch?v=LfA2XDmgVbo