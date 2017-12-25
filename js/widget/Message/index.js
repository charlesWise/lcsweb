'use strict'
import React from 'react';

import {
    Wrapper,Link
} from 'widget';
import List from './List';
import SysMessageList from './SysMessageList';
import MessageDetail from './MessageDetail';
export default class Message extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            index:0,
            item:undefined
        }
    }
     _goQimo(){
         this.props.history.push('/common/qimo/'+encodeURIComponent(location.href));
    }
    _onItemClick(item){
        switch (this.state.index){
            case 0:
                this.setState({index:1,item});
                break;
            case 1:
                this.setState({index:2,item});
                break;
        }
    }
    _onBack(){
        this.setState({index:this.state.index-1})
    }
    _renderList(){
        switch(this.state.index){
            case 0:
                return <List 
                        onItemClick = {()=>this._onItemClick()}
                        history = {this.props.history} />
            case 1:
                return <SysMessageList
                            onItemClick = {(item)=>this._onItemClick(item)}
                             />
            case 2: 
                return <MessageDetail 
                            time = {this.state.item.time}
                            title = {this.state.item.title}
                            content = {this.state.item.content}/>
        }
    }
    render(){
        return <div>
            <div className="mask-bg"></div>
            <div className="message-box">
                <div className = {this.state.index!=0?'message-header message-header-2':'message-header'}>
                    <p className="message-title">消息</p>
                    <a className="message-close-btn" onClick = {()=>this.props.onClose&&this.props.onClose()}></a>
                    <a className="message-header-back" onClick = {()=>this._onBack()}></a>
                </div>
                {this._renderList()}
                <div className = "message-footer"></div>
            </div>
        </div>
    }
}