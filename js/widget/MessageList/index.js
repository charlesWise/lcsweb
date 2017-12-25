'use strict'
import React from 'react';

import {
    Wrapper,Link
} from 'widget';

export default class MessageList extends React.Component{
    constructor(...props){
        super(...props);
    }
    _goQimo(){
         this.props.history.push('/common/qimo/'+encodeURIComponent(location.href));
    }
    render(){
        return <div>
            <div className="detailed-box">
                 <p className="detail-name">消息</p>
                 <a className="closed" onClick = {()=>this.props.onClose&&this.props.onClose()}></a>
                 <div className="detailed">
                     <ul className="system-list">
                        <li onClick = {()=>this._goQimo()}>
                            <aside><p>侬享客服<span className="time">星期三 14:52</span></p>
                            <p>尊敬的客户，恭喜您成功认养一头年猪。</p></aside>
                            <i className="arrow"></i>       
                        </li>
                        <li>
                            <aside><p>强制宰杀提醒<span className="time">昨天 14:52</span></p>
                            <p>尊敬的客户，恭喜您成功认养一头年猪。尊敬的客户，恭喜您成功认养一头年猪。</p></aside>
                            <i className="arrow"></i>     
                        </li>
                        <li>
                            <aside><p>小新农庄<span className="time">星期二 14:52</span></p>
                            <p className="color1">尊敬的客户，恭喜您成功认养一头年猪。</p></aside> 
                            <i className="arrow"></i>
                        </li>
                        <li>
                            <aside><p>小新农庄<span className="time">星期一 14:52</span></p>
                            <p className="color1">尊敬的客户，恭喜您成功认养一头年猪。</p></aside>
                            <i className="arrow"></i>  
                        </li>
                        <li>
                            <aside><p>小新农庄<span className="time">2017-6-1 14:52</span></p>
                            <p className="color1">尊敬的客户，恭喜您成功认养一头年猪。</p></aside> 
                            <i className="arrow"></i>
                        </li>
                     </ul>
                 </div>
            </div>
            <div className="mask-bg"></div>
        </div>
    }
}