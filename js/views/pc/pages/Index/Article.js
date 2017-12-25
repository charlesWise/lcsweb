'use strict'
//媒体报道
import React from 'react';

export default class Article extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        let mlist = this.props.mlist || [];
        let nlist = this.props.nlist || [];
        return (
            <div className="dont-mains">
                <ul className="dont-nav">
                    <li className="nav-s">
                        <div className="dont-tit">
                            <h2>媒体报道</h2>
                            <a href="/aboutUs.html?type=5" className="tit-more">更多<i></i></a>
                        </div>

                        <div className="dont-div">
                            {
                                mlist.map((item, index) => {
                                    if(index > 4) return null;
                                    return (
                                        <a key={'mlist' + index} href={"/aboutUs.html?type=5&id="+item.id}>
                                            <p className="dont-wz">
                                                <i className="dont-tit-icon"></i>
                                                <span className="wz1">{
                                                    item.title && item.title.length > 22 ? 
                                                        item.title.substr(0, 22) + '...'
                                                    :
                                                    item.title
                                                }</span>
                                                <span className="wz2">{item.report_time}</span>
                                            </p>
                                        </a>
                                    )
                                })
                            }
                            
                        </div>

                    </li>
                    <li className="nav-s">
                        <div className="dont-tit">
                            <h2>新闻资讯</h2>
                            <a href="/aboutUs.html?type=7" className="tit-more">更多<i></i></a>
                        </div>

                        <div className="dont-div">
                            {
                                nlist.map((item, index) => {
                                    if (index > 4) return null;
                                    return (
                                        <a key={'nlist' + index} href="/aboutUs.html?type=7">
                                            <p className="dont-wz">
                                                <i className="dont-tit-icon"></i>
                                                <span className="wz1">{
                                                    item.title && item.title.length > 22 ?
                                                        item.title.substr(0, 22) + '...'
                                                        :
                                                        item.title
                                                }</span>
                                                <span className="wz2">{item.report_time}</span>
                                            </p>
                                        </a>
                                    )
                                })
                            }
                        </div>

                    </li>
                </ul>
            </div>
        )
    }
}
