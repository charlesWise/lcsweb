'use strict'
//右侧
import React from 'react';
import ReactDOM from 'react-dom';

export default class Server extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            index: 0,
            show_top: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", (e)=>{
            if (document.documentElement.scrollTop > 700){
                if(!this.state.show_top){
                    this.setState({
                        show_top: true
                    })
                }
            } else {
                if (this.state.show_top){
                    this.setState({
                        show_top: false
                    })
                }
            }
        } , false);
    }

    _onMouseEnter(index) {
        this.setState({
            index: index
        })
    }
    _onMouseLeave(){
        this.setState({
            index: 0
        })
    }

    render(){
        return (
            <div className="fixed-aside">

                <div className="service-mess">
                    <a href="javascript:;" className="btn_talk" onMouseEnter={this._onMouseEnter.bind(this, 1)} onMouseLeave={this._onMouseLeave.bind(this)}>
                        <i className="ico icn-service">
                            <span className="text1">{this.state.index==1?'在线':''}</span>
                            <span className="text2">{this.state.index==1?'客服':''}</span>
                        </i>
                    </a>
                    {
                        this.state.index == 1 &&
                        <div className="online">
                            {/*<em className="fixedD"></em>
                            <div className="call">
                                <p className="cont">客服热线</p>
                                <div className="txtNum">
                                    <p>400-158-3737</p>
                                </div>

                            </div>
                            <div className="call">
                                <p className="txt-time">工作日9：00-21：00<br />节假日9：00-17：30</p>
                            </div>*/}
                        </div>
                    }
                </div>
                <div className="service-app">
                    <a href="javascript:;" className="btn_talk" onMouseEnter={this._onMouseEnter.bind(this, 2)} onMouseLeave={this._onMouseLeave.bind(this)}>
                        <i className="ico icn-app">
                            <span className="text1">{this.state.index==2?'下载':''}</span>
                            <span className="text2" style={{left:'16px'}}>{this.state.index==2?'APP':''}</span>
                        </i>
                    </a>
                    {
                        this.state.index == 2 &&
                        <div className="online doubleApp">
                            <p>
                                <img src="images/index/fr-app.png" />
                            </p>
                        </div>
                    }
                </div>

                <div className="app-code">
                    <a href="javascript:;" className="btn_talk" onMouseEnter={this._onMouseEnter.bind(this, 3)} onMouseLeave={this._onMouseLeave.bind(this)}>
                        <i className="ico icn-service-weixin">
                            <span className="text1">{this.state.index==3?'关注':''}</span>
                            <span className="text2">{this.state.index==3?'问题':''}</span>
                        </i>
                    </a>
                    {
                        this.state.index == 3 &&
                        <div className="online doubleCode" >
                            <p>
                                <img src="images/index/fr-weixin.png" />
                            </p>
                        </div>
                    }
                </div>
                <div className="service-wenti">
                    <a href="/feedback.html" className="btn_talk" onMouseEnter={this._onMouseEnter.bind(this, 4)} onMouseLeave={this._onMouseLeave.bind(this)}>
                        <i className="ico icn-wenti">
                            <span className="text1">{this.state.index==4?'反馈':''}</span>
                            <span className="text2">{this.state.index==4?'问题':''}</span>
                        </i>
                    </a>
                </div>
                {
                    this.state.show_top &&
                    <div className="service-top">
                        <a href="#react-placeholder" className="btn_talk">
                            <i className="ico icn-top"></i>
                        </a>
                    </div>
                }
            </div>
        )
    }
}

AppRegister.registerSide(<Server />)
