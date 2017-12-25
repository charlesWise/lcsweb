'use strict'
//底部
import React from 'react';

export default class Footer extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return <div className="footer">
        <div className="footer_info">
            <div className="linkinfo">
                <div className="foot_l">
                <dl>
                    <dt>关于</dt>
                    <dd><a href="aboutUs.html?type=0">关于我们</a></dd>
                    <dd><a href="aboutUs.html?type=1">帮助中心</a></dd>
                    <dd><a href="https://org.cfylicai.com/org/orgregister_toAddOrgUser.jhtml" target="blank">机构入驻</a></dd>
                    <dd><a href="aboutUs.html?type=2">联系我们</a></dd>
                </dl>

                <dl className="dl-last">
                    <dt>发现</dt>
                    <dd><a href="aboutUs.html?type=5">媒体报道</a></dd>
                    <dd><a href="aboutUs.html?type=6">合作伙伴</a></dd>
                    <dd><a href="aboutUs.html?type=7">新闻资讯</a></dd>
                    <dd><a href="aboutUs.html?type=8">路演视频</a></dd>
                </dl>
                </div>
                <div className="foot_c">
                <ul>
                    <li>
                        <p className="p-txt">微信订阅号</p>
                        <p className="footer-img"><img src="images/index/erweima.png"/></p>
                    </li>
                    <li className="last-child">
                        <p className="p-txt">APP客户端</p>
                        <p className="footer-img"><img src="images/index/erweima_app.png"/></p>
                    </li>
                </ul>
                </div>
                <div className="foot_r">
                <h1>客服热线</h1>
                <h2>400-877-6097</h2>
                    <p>工作日: 9:00-18:00    &nbsp; &nbsp;    节假日: 9:00-18:00</p>
                </div>
            </div>
        </div>
        <div className="footer-bottom">Copyright©2016, cfylicai.com. All Rights Reserved&nbsp;&nbsp;&nbsp;浙ICP备16036657号&nbsp;&nbsp;&nbsp;版权所有：杭州长富网络科技有限公司&nbsp;&nbsp;&nbsp;<a style={{ color: '#AAAAAA' }} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502003931" target='_blank'><img src="/images/index/ghs.png" />浙公网安备33010502003931</a>&nbsp;&nbsp;&nbsp;市场有风险,投资需谨慎</div>
    </div>
    }
}
