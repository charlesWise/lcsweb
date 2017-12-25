'use strict'
import React from 'react';

export default class Item extends React.Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <li onClick = {this.props.onClick}><span className="picture"><img src="./images/center/default-img.png" />{this.props.count&&<i>{this.props.count}</i>||''}</span>
            <aside><p>{this.props.name||''}</p><p className="color2">{this.props.message||''}</p></aside>
            <span className="time">{this.props.time||''}</span>
        </li>
    }
}