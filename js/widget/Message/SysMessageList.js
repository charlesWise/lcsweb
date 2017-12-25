'use strict'
import React from 'react';
import ServiceUrl from 'res/ServiceUrl';
import chttp from 'controller/chttp';
var list = [],time = 0;
class Item  extends  React.Component{
    constructor(...props){
        super(...props);
        
    }

    render(){
       return <li onClick = {this.props.onClick}>
                            <aside><p>{this.props.title}<span className="time">{this.props.time}</span></p>
                            <p>{this.props.content}</p></aside>
                            <i className="arrow"></i>       
                        </li>
    }
}
export default class SysMessageList extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            list:list
        }
    }
    componentDidMount() {
        if(Date.now()-time>300000){
            this._getMessage();
        }
    }
    _getMessage(){
        chttp.post(ServiceUrl.userNotice).then((content)=>{
            if(content.boolen && Array.isArray( content.data.list)){
                list = content.data.list;
                time = Date.now();
                this.setState({list});
            }
        })
    }
    _onItemClick(item){
        this.props.onItemClick&&this.props.onItemClick(item);
    }
    render(){
        return <ul className="message-list system-list">
                {this.state.list.map((item)=>{
                   return  <Item
                        title = {item.title}
                        time = {item.time}
                        onClick = {()=>this._onItemClick(item)}
                        content = {item.content.slice(0,15)}
                         />
                    })}
        </ul>
    }
}
