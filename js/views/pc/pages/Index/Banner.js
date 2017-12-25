'use strict'
//banner
import React from 'react';
import Slider from 'react-slick';

export default class Banner extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {}
    }

    componentWillReceiveProps(){
        this.forceUpdate()
    }
    
    render() {
        var settings= {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            nextArrow: <SlideArrow/>,
            prevArrow: <SlideArrow />
        }
        var arr = this.props.data || [];
        return (
            <div className="banner">
               {arr.length>0&& <Slider {...settings}>
                    {
                        arr.map((item, index, arr) => {
                            if (!!item.image_url)
                                return <SlideItem key={index} src={item.image_url} key={index} />
                            else
                                return <div key={index}/>
                        })
                    }
                </Slider>}
            </div>
        )
    }
}

class SlideItem extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }

    render() {
        let src = this.props.src;
        return (
            <a href="javascript:;" {...this.props}>
                <img style={{ width: '100%', height: '450px' }} src={src} />
            </a>
        )
    }
}

class SlideArrow extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }

    render() {
        return <div style={{ display: 'none' }} />
    }
}
