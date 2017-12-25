'use strict'
//暂无相关数据
import React from 'react';

export default class NoDate extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="nodate">
                <i className=""></i>暂无相关数据
            </div>
        )
    }
}
