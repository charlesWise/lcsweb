'use strict'
import React from 'react';
import Item from './Item';
export default class List extends React.Component{
    constructor(...props){
        super(...props);
    }
    _goQimo(){
         this.props.history.push('/common/qimo/'+encodeURIComponent(location.href));
    }
    _goSysMessage(){

    }
    render(){
        return <ul className="message-list">
                <Item 
                    onClick = {()=>this._goQimo()}
                    name = '侬享客服'
                />
                <Item 
                    onClick = {this.props.onItemClick}
                    name = '消息助手'
                />
        </ul>
    }
}