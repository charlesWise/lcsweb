'use strict'
//右侧
import React from 'react';

export default class Loading extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <div className="mask"></div>
                <div className="loading"></div>
            </div>
        )
    }
}

AppRegister.registerLoading(<Loading />);
