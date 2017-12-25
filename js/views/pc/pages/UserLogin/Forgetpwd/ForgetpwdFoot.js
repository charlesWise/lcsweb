'use strict'
//登录head
import React from 'react';

export default class ForgetpwdFoot extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="Login-foot">
                <p>
                    <a href='/aboutUs.html?type=0'><span>关于我们</span></a>
                    <a href='/aboutUs.html?type=1'><span>帮助中心</span></a>
                    <a href="https://org.cfylicai.com/org/orgregister_toAddOrgUser.jhtml" target="blank"><span>机构入驻</span></a>
                    <a href='/aboutUs.html?type=2'><span>联系我们</span></a>
                    <a href='/aboutUs.html?type=5'><span>媒体报道</span></a>
                    <a href='/aboutUs.html?type=6'><span>合作伙伴</span></a>
                    <a href='/aboutUs.html?type=7'><span>新闻资讯</span></a>
                    <a href='/aboutUs.html?type=8'><span>路演视频</span></a>
                </p>
                <p style={{ padding: '13px 0' }}>Copyright©2016, cfylicai.com. All Rights Reserved&nbsp;&nbsp;&nbsp;浙ICP备16036657号&nbsp;&nbsp;&nbsp;版权所有：杭州长富网络科技有限公司&nbsp;&nbsp;&nbsp;<a style={{ color: '#AAAAAA' }} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502003931" target='_blank'><img src="/images/index/ghs.png" />浙公网安备33010502003931</a>&nbsp;&nbsp;&nbsp;市场有风险,投资需谨慎</p>
            </div>
        )
    }
}
