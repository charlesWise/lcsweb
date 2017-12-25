'use strict'
//查看文件
import React from 'react';
import Header from './../../Index/Header';
import Footer from './../../Index/Footer';
import Http from './../../../../../controller/pcapi';

import Location from './../../../../../util/Location';

export default class ViewFile extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            fid: "",
            data: {},
            attach: [],
            url: '',
            name: '',
            index: 1
        }
    }

    componentDidMount() {
        this._getDetail(Location.queryString('fid') || 0);
    }

    _getDetail(fid) {
        if (!fid) {
            this.setState({
                attach: []
            });
            return;
        }
        Http.fundDetail({ fund_id: fid }).success((data, next) => {
            data = (data.data && data.data.info) || {}
            let attach = data.attach || []
            // attach = [{
            //     "name": "\u3010\u5408\u540c\u3011\u4e2d\u80fd\u6e90\u519c\u5b9d1\u53f7\u79c1\u52df\u57fa\u91d1\u57fa\u91d1\u5408\u540c.pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/05\/24\/592564083d17a.pdf"
            // }, {
            //     "name": "\u3010\u7b80\u7248\u3011\u4e2d\u80fd\u6e90\u519c\u5b9d1\u53f7\u79c1\u52df\u57fa\u91d1.pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/05\/24\/59256410c7ae0.pdf"
            // }, {
            //     "name": "\u4fdd\u8bc1\u5408\u540c.pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/05\/24\/5925641fb74cc.pdf"
            // }, {
            //     "name": "\u5546\u7968\u8d28\u62bc\u534f\u8bae.pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/05\/24\/59256427bd4dd.pdf"
            // }, {
            //     "name": "\u4e2d\u80fd\u6e90\u519c\u5b9d1\u53f7\u79c1\u52df\u57fa\u91d1\u5c3d\u804c\u8c03\u67e5\u62a5\u544a.pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/09\/22\/59c4b674b0364.pdf"
            // }, {
            //     "name": "\u4e2d\u80fd\u6e90\u519c\u5b9d1\u53f7\u79c1\u52df\u57fa\u91d1\u6295\u8d44\u8bf4\u660e\u4e66(1).pdf",
            //     "url": "http:\/\/img.cfylicai.com\/data\/uploads\/file\/2017\/09\/22\/59c4c3ce946f0.pdf"
            // }]
            this.setState({
                data: data || {},
                attach: attach,
                url: attach[0] && attach[0]['url'] || '',
                name: attach[0] && attach[0]['name'] || ''
            });
        })
    }

    _change(item, index){
        this.setState({
            url: item.url,
            name: item.name,
            index: index+1
        })
    }

    _download(type) {
        let fundId = (type == 'all' ? (Location.queryString('fid') || '') : '')
        let fileUrl = (type == 'single' ? this.state.url : '')
        // Http.fundLoad({
        //     fundId: fundId,
        //     fileUrl: fileUrl
        // }).success((data, next)=>{})
        window.location.href = '/api/Pc/FundCenterPc/fundLoad?fundId=' + fundId + '&fileUrl=' + fileUrl + '&access_token=' + localStorage.getItem('accessToken');
    }

    render(){
        return (
            <div>
                <Header />
                {
                    this.state.attach && this.state.attach.length > 0 ?
                    <div className="view-file">
                            <h3>{this.state.data.fund_name} > {this.state.index}、{this.state.name}</h3>
                        <div className="search-file">
                            <span className="fl">
                                {
                                    this.state.attach.map((item,index)=>{
                                            return (<a onClick={this._change.bind(this, item, index)} className={ this.state.index == index+1 ? 'active' : '' } key={ index }>{index+1}、{item.name}</a>)
                                    })
                                }
                            </span>

                            <span className="fr">
                                <a href='javascript:;' onClick={this._download.bind(this,'single')}>当前下载</a>
                                <a href='javascript:;' onClick={this._download.bind(this,'all')}>全部下载</a>
                            </span>

                        </div>
                        <div className="file-wrap">
                            {
                                this.state.url &&
                                    <iframe style={{ height: '600px', width: '100%', border: 'none' }} src={this.state.url} frameBorder="0"></iframe>
                            }
                        </div>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>
                        当前产品没有预览材料
                    </div>
                }
                
                <Footer />
            </div>
        )
    }
}

AppRegister.register(<ViewFile />);
