import React, { Component } from 'react';

export default class ProDetailTabs extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            tabIndex: 0
        }
    }

    _onClick(index){
        this.props.onClick && this.props.onClick(index);
        this.setState({
            tabIndex: index
        })
    }

    render() {
        let detail = this.props.detailInfo || {};
        let pdfList = detail.attach;
        let detail_attach = detail.pro_detail_attach;
        let manage_attach = detail.fund_manage_attach;
        return (
            <div className="detail-cont-tab">
                <ul>
                    <li className={this.state.tabIndex == 0 ? "curent" : ""} onClick={this._onClick.bind(this,0)}>产品信息</li>
                    <li className={this.state.tabIndex == 1 ? "curent" : ""} onClick={this._onClick.bind(this,1)}>产品亮点</li>
                    <li className={this.state.tabIndex == 2 ? "curent" : ""} onClick={this._onClick.bind(this,2)}>风险措施</li>
                    {
                        (!!manage_attach || !!detail_attach || (Array.isArray(pdfList) && pdfList.length > 0)) &&
                        <li className={this.state.tabIndex == 3 ? "curent" : ""} onClick={this._onClick.bind(this, 3)}>项目资料和图片</li>
                    }
                    {
                        Boolean(detail.luyan_name && detail.luyan_thumb) &&
                        <li className={this.state.tabIndex == 4 ? "curent" : ""} onClick={this._onClick.bind(this, 4)}>路演视频</li>
                    }
                </ul>
            </div>
        )
    }
}
