'use strict'
import React from 'react';
import Header from './../../Index/Header';
import ProDetailWrapper from "./ProDetailWrapper";
import ProDetailMess from './ProDetailMess';
import ProDetailSider from './ProDetailSider';
import ProInformation from './ProInformation';
import ProHighlights from './ProHighlights';
import ProDanger from './ProDanger';
import ProDatum from './ProDatum';
import ProVideo from './ProVideo';
import Footer from './../../Index/Footer';

import Http from './../../../../../controller/pcapi';
import Location from './../../../../../util/Location';

class Index extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            detailInfo: {}
        }
    }

    componentDidMount() {
        this._getDetail(Location.queryString('fid') || 0);
    }

    _getDetail(fid) {
        Http.fundDetail({ fund_id: fid }).success((data, next) => {
            data = data.data && data.data.info
            this.setState({
                detailInfo: data || {},
            });

            window.jiathis_config = {
                shortUrl: true,
                imageUrl: data.share_img,
                imageWidth: 26,
                url: window.location.href,
                title: data.share_title,
                summary: data.share_desc,
                pic: data.share_img,
            }
        })
    }

    render(){
        return (
            <div>
                <Header />
                <div className="detail-wrap">
                    <ProDetailMess detailInfo={this.state.detailInfo} />
                    <ProDetailSider detailInfo={this.state.detailInfo} />
                    <ProDetailWrapper detailInfo={this.state.detailInfo} />
                </div>
                <Footer />
            </div>
        )
    }
}

AppRegister.register(<Index />);