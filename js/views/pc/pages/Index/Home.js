'use strict'
import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Notice from './Notice';
import Product from './Product';
import Article from './Article';
import Partner from './Partner';
import Footer from './Footer';
import Http from './../../../../controller/pcapi';

class Index extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            data: {},
            banner: [],
            flist: [],
            mlist: [],
            nlist: [],
            alist: [],
            plist: [],
            annc_list: []
        }
    }

    componentDidMount() {
        this._getData()
    }
    
    _getData(){
        this._getIndex()
        this._getMediaList()
        this._getInfoList()
        this._getActList()
        this._getParnerList()
    }

    _getIndex(){
        Http.indexInit({
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                banner: (data && data.slideshow_rows) || [],
                flist: (data && data.fund_rows) || [],
                data: data,
                annc_list: (data && data.annc_list) || [],
            });
        })
    }

    _getActList(){
        Http.getActivityListIndex({
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                alist: data.data || []
            })
        })
    }

    _getParnerList() {
        Http.parnerList({
            limit: 200
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                plist: data.data || []
            })
        })
    }

    _getInfoList() {
        Http.infoList({
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                nlist: data.data || []
            })
        })
    }

    //媒体报道
    _getMediaList() {
        Http.mediaList({
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                mlist: data.data || []
            })
        })
    }

    render(){
        return (
            <div>
                <Header />
                <Banner data={this.state.banner} />
                <Notice data={this.state.annc_list}/>
                <Product data={this.state.data} />
                <Article mlist={this.state.mlist} nlist={this.state.nlist} />
                {this.state.plist.length>0&&<Partner plist={this.state.plist} alist={this.state.alist} />||null}
                <Footer />
            </div>
        )
    }
}

AppRegister.register(<Index />);