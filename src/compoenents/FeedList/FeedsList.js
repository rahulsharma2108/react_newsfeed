import React from 'react';
import axios from 'axios';

import './feedlist.css'; 
export default class FeedsList extends React.Component{
 
    compponentDidMount(){
      this.upvotePost = this.upvotePost.bind(this);
    }
    upvotePost(objectID, points){
        console.log('upvote called',objectID);
        if(localStorage.getItem(`upvote_${objectID}`)){
            localStorage.setItem(`upvote_${objectID}`,parseInt(localStorage.getItem(`upvote_${objectID}`))+1);
        }else{
            localStorage.setItem(`upvote_${objectID}`,points+1);
        }
        
    };
    renderStories(){

        return (
            
            <>
            {this.props.storiesList && this.props.storiesList.map(({title,url,author,points, objectID})=>{
                 return (
                    <div className={'newsItem'}>
                                    <div className={'rank'}>
                                        {points}
                                    </div>
                                    <div className={'upvote'} onClick={()=>this.upvotePost(objectID,points)}>
                                        <img src={'img/upvote.gif'}/>
                                    </div>
                                    <div className={'storyTitle'}>
                                        {title}
                                    </div>
                                </div>
                 )
            })}
            </>
        )
    }

    render(){
        return (
        <div className={'listContainer'}>
            {this.renderStories()}
        </div>
        )
    }
}