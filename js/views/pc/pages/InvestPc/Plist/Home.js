'use strict'
import React from 'react';
import Header from './../../Index/Header';
import Plist from './Plist';
import Footer from './../../Index/Footer';

class Index extends React.Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return (
            <div>
                <Header />
                <Plist />
                <Footer />
            </div>
        )
    }
}

AppRegister.register(<Index />);