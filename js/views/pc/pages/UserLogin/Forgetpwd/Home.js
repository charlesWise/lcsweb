'use strict'
import React from 'react';
import ForgetpwdHead from './ForgetpwdHead';
import ForgetpwdFoot from './ForgetpwdFoot';
import Forgetpwd from './Forgetpwd';

class Index extends React.Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return <div className="login-wrap">
            <ForgetpwdHead/>
            <Forgetpwd/>
            <ForgetpwdFoot/>
    </div>
    }
}

AppRegister.register(<Index />);