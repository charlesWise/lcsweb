'use strict'

import React from 'react';
import Video from './Video';

export default class Play extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            isShow:false
        }
    }

    componentDidMount(){
        //if(movieSource){
        //    this.setState({
        //        isShow:true
        //    })
        //}
    }

    //shouldComponentUpdate(nextProps) {
    //    window.addEventListener('storage',function (e) {
    //        return true
    //    })
    //}

    render(){
        let img = this.props.posterImg || '/images/InvestPc/video-pic.png';
        return <div className={this.props.isShowMovie?"movie_bg":'dn'}>
                <div className="movie_wrapper">
                    <img src="/images/aboutUs/close.png" className="close" onClick={()=>this.props.close && this.props.close()}></img>
                    <video
                        style={{ height: '100%', width: '100%',objectFit: 'fill'}}
                        width="400"
                        height="180"
                        className="video-js"
                        preload="auto"
                        data-setup='{}'
                        ref="ele"
                        poster={img}
                        controls
                        src={this.props.movieSource }
                    >
                        <source src={this.props.movieSource }></source>
                    </video>
                </div>
        </div>
    }
}
