'use strict'
//查看文件
import React from 'react';

export default class ProVideo extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            detail: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let detail = nextProps.detailInfo || {};
        this.setState({
            detail: detail
        })
    }

    render() {
        let detail = this.props.detailInfo || {};
        return (
            <div className="detail-cont-div2">
                <h3>{detail.fund_name}</h3>
                <div className="del-con-video">
                    <video
                        style={{ height: '385px', width: '775px' }}
                        width="775"
                        height="385"
                        class="video-js"
                        preload="auto"
                        poster="/images/InvestPc/video-pic.png"
                        data-setup='{}'
                        controls
                    >
                        <source src={detail.luyan_name} type="video/mp4"></source>
                    </video>
                    {/* <img src="/images/InvestPc/video-pic.png" alt="Video" /> */}
                </div>
            </div>
        )
    }
}
