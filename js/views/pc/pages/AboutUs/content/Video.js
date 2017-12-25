'use strict'
//查看文件
import React from 'react';

export default class Video extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            source: ''
        }
    }

    render() {
        let source = this.props.source || '';
        let img = this.props.img || '/images/InvestPc/video-pic.png';
        return (
                    <video
                        style={{ height: '100%', width: '100%',objectFit: 'fill'}}
                        width="400"
                        height="180"
                        className="video-js"
                        preload="auto"
                        poster={img}
                        data-setup='{}'
                        ref="ele"
                        controls
                    >
                        <source src={'//vjs.zencdn.net/v/oceans.webm'} type="video/mp4"></source>
                    </video>
        )
    }
}
