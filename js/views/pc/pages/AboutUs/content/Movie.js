'use strict'
import React from 'react';
import Nav from './Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class Movie extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['路演视频'],
            movieList:[],
            totalPage:1,
            isShow:true
        }
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    fetchData(page){
        Http.roadshowList({page,limit:5}).success(function (source, next) {
            this.setState({
                movieList:source.data.data,
                totalPage:source.data.total_page_num
            })
        }.bind(this))
    }

    play(movieSource,posterImg){
        this.props.showMovie && this.props.showMovie(movieSource,posterImg);
    }

    componentDidMount(){
       this.fetchData(1);
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} />
            <div className="about_content">
                {
                    this.state.movieList && this.state.movieList.length?<ul className="movieList">
                        {
                            this.state.movieList && this.state.movieList.map(function(item,index){
                                return <li key={index}>
                                    <div className="left">
                                        <img src={item.roadshow_img || '/images/investPc/video-pic.png'} alt=""/>
                                    </div>
                                    <div className="right">
                                        <h2 className="title">{item.title}</h2>
                                        <p className="des">发布时间：{item.ctime}</p>
                                        <div className="btn" onClick={()=>this.play(item.roadshow_video,item.roadshow_img)}>立即播放</div>
                                    </div>
                                </li>
                            }.bind(this))
                        }
                    </ul>:<NoDate/>
                }
                <Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
            </div>
        </div>
    }
}
