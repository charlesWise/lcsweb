'use strict'
//平台活动
import React from 'react';
import Slider from 'react-slick';

export default class Partner extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            initialSlide: 0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };

        let alist = this.props.alist || [];
        let plist = this.props.plist || [];

        return (
            <div className="new-mains">
                <h2>平台活动 <em>优质之选为您推荐</em> <a className="index-more" href="/aboutUs.html?type=4">更多活动 <i></i></a></h2>
                <div className="new-peo">     
                    <div className="q-float">
                        <ul className="new-nav">
                            {
                                alist.map((item, index) => {
                                    if (index > 3) return null;
                                    return (
                                        <li key={'alist'+index}>
                                            <a href="javascript:;">
                                                <img src={item.banner1} style={{width:'285px',height:'140px'}} />
                                            </a>
                                            <p>{item.status_str} <em>{item.start_time}</em></p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <h2>合作伙伴 <em>优质之选为您推荐</em></h2>
                <div className="partner">
                    <div className="paret-con">
                    {plist &&plist.length>0&& <Slider {...settings}>
                            {
                                plist.map((item, index, arr) => {
                                    return <SlideItem key={'plist' + index} src={item.banner && item.banner.small} />
                                })
                            }
                        </Slider>||null}
                    </div>
                </div>
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
        return (
            <a href="javascript:;" {...this.props}>
                <img style={{ width: '160px', height: '60px' }} src={this.props.src} />
            </a>
        )
    }
}
