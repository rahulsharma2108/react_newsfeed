import React from 'react';
import './header.css'

export default class Header extends React.Component{
    render(){
        return (
            <div className={'header'}>
                <div className={'title'}>
                    Hacker news
                </div>
            </div>
        )
    }
}