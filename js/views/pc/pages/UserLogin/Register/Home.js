'use strict'
import React from 'react';
import RegisterHead from './RegisterHead';
import RegisterFoot from './RegisterFoot';
import Register from './Register';

class Index extends React.Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return <div className="login-wrap">
            <RegisterHead/>
            <Register/>
            <RegisterFoot/>
    </div>
    }
}

AppRegister.register(<Index />);