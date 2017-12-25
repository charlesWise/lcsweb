'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';

export default class AboutUs extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['公司简介','股东背景','营业执照','业务模式','核心优势'],
            isShowMovie:false,
            clickMovie:false
        }
    }

    _play(){
        this.setState({
            isShowMovie:!this.state.isShowMovie
        })
        if(!this.state.isShowMovie){
            this.refs.video.play();
        }else{
            this.refs.video.pause();
        }
    }

    selected(index) {
        this.setState({
            curIndex: index
        })
    }

    componentDidMount(){
        this.setState({
            clickMovie:false
        })
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} selected={this.selected.bind(this)}/>
            {
                this.state.curIndex==0?<div className="about_content">
                    <img src="/images/aboutUs/mansion.png" className="about_bg"></img>
                    <p className="about_pro">长富云是投融长富金服集团旗下的互联网理财师平台，由杭州长富网络科技有限公司运营。长富云运用“互联网+理财师”模式，打造专业领先的互联网理财师服务平台，培养并提升理财师服务高净值客户能力，助力中国广大理财师实现真正独立创业。长富云以无数优秀理财师实现独立创业提供极致体验的服务平台为使命，通过多元化理财产品，满足高净值人群多样化、个性化的资产配置需求，提高国内整体的资产配置水平。</p>
                </div>:
                this.state.curIndex==1?<div className="about_content">
                        <video style={{width:'100%',height:'300px','objectFit':'fill'}} ref="video" poster="/images/aboutUs/mansion.png" onClick={()=>this._play()}>
                            <source src="/images/aboutUs/changfuyun.mp4" type="video/mp4" onClick={()=>this._play()}/>
                        </video>
                        <img src="/images/aboutUs/play.png" alt="" className={!this.state.isShowMovie?"play_btn":'dn'}/>
                        <p className="about_pro">投融长富金服集团业务范围涵盖财富管理、基金管理、投行业务及保险销售、文化投资等领域。</p>
                        <p className="about_pro">2016年集团确立网贷平台—投融家、互联网保险—投保家、互联网理财师—长富云协同发展的互金3.0战略。投融家是全国网贷平台综合排名百强品牌，与知名银行进行资金存管合作，并于2016年8月获得国内领先创投机构“硅谷天堂”A轮数千万融资。投保家拥有全国保险代理牌照，业务网络覆盖全国20多个省份，致力于成为国内领先的综合性互联网保险销售平台。</p>
                </div>:
                this.state.curIndex==2?<div className="about_content">
                    <img src="./images/aboutUs/licence.png" alt="" className="license"/>
                    <p>杭州长富网络科技有限公司</p>
                </div>:
                this.state.curIndex==3?<div className="about_content">
                    <img src="/images/aboutUs/mansion.png" className="about_bg"></img>
                    <p className="about_pro">长富云打造“互联网+理财师”模式，依托国内顶尖互联网金融科技研发团队，构建APP、微信、PC三大互联网服务平台，完美对接优质丰富金融资产和庞大理财师群体，通过免费专业培训、全方位服务、资源拓展等途径培养并提升理财师服务高净值客户能力，满足高净值人群多样化、个性化的资产配置需求。</p>
                </div>:this.state.curIndex==4?<div className="about_content">
                    <ul className="kernel">
                        <li>
                            <img src="./images/aboutUs/product.png" alt=""/>
                            <h2 className="title">优质产品</h2>
                            <p>百亿优质包销产品，五大类产品类型，专业投研团队通过严格评级体系精选提供</p>
                        </li>
                        <li>
                            <img src="./images/aboutUs/commission.png" alt=""/>
                            <h2 className="title">快速结佣</h2>
                            <p>全国首家佣金线上结算，财富快人一步，去除中间环节，全额返佣佣金高于市场价8‰以上</p>
                        </li>
                        <li>
                            <img src="./images/aboutUs/company.png" alt=""/>
                            <h2 className="title">上市公司背景</h2>
                            <p>长富云是投融长富金服集团旗下的互联网理财师平台，拥有香港主板上市公司（00850.HK）背景</p>
                        </li>
                        <li>
                            <img src="./images/aboutUs/service.png" alt=""/>
                            <h2 className="title">专属服务</h2>
                            <p>极速结佣，配置专属服务经理，真正实现互联网+理财师一站式服务平台</p>
                        </li>
                    </ul>
                </div>:''
            }
        </div>
    }
}
