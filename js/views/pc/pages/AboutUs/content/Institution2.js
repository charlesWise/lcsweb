'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import {testName,testPhone,testAddress} from 'util/RegExp';

export default class Institution2 extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
           
        }
    }

    componentDidMount(){

    }

    render(){
        return <div className="about_r">
            <iframe src="https://org.cfylicai.com/org/orgregister_toAddOrgUser.jhtml"
                    frameBorder="0" height="1394px" width="960px" id="institution"
            >
            </iframe>
        </div>
    }
}
