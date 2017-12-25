'use strict'
import React from 'react';
import Header from './../Index/Header';
import AccountNav from "./AccountNav";
import AccountMain from "./AccountMain";
import Footer from './../Index/Footer';
import Location from './../../../../util/Location';

import Statement from './../../../../widget/Statement';

import DateFormat from './../../../../util/Date';

class Index extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,      //0-5主目录，6-8子目录
            data: {}
        }
    }

    componentDidMount() {
        let type = Location.queryString('type');
        if (type){
            this.selected(type)
        }
        if (localStorage.getItem('stmt_time') != DateFormat.format(Date.now(), 'yyyy-MM-dd')) {
            this.refs.stmt.show();
        }
    }
    
    selected(index, data) {
        window.location.href = '#react-placeholder'
        this.setState({
            curIndex: index,
            data: data || {}
        })
    }

    render(){
        return (
            <div>
                <Header />
                <div className="account-wrap">
                    <AccountNav curIndex={this.state.curIndex} selected={this.selected.bind(this)} />
                    <AccountMain curIndex={this.state.curIndex} selected={this.selected.bind(this)} data={this.state.data} />
                </div>
                <Footer />
                <Statement ref='stmt'/>
            </div>
        )
    }
}

AppRegister.register(<Index />);