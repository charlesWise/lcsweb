'use strict'
import React from 'react';

import {
    Wrapper, Link
} from 'widget';
/**
 * 
 *                     <p><span>出生时间：</span>2017年6月20日 17:11</p>
                        <p><span>认养时间：</span>2017年6月20日 17:11</p>
                        <p><span>认养费用：</span> <em className="color2">¥2650.00</em></p>
                        <p><span>预计出栏日期：</span>2017年6月20日 17:11</p>
                        <p><span>最迟宰杀日期：</span>2017年6月20日 17:11</p>
 * 
 * @export
 * @class MessageDetails
 * @extends {React.Component}
 */
export default class MessageDetails extends React.Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <div className="message-list">
            <div className="envelope">
                <div className="message-top">
                    <h4>{this.props.time}</h4>
                    <h3>{this.props.title}</h3>
                    <p className="line"></p>
                </div>

                <div className="message-details">
                    <p className="color1">{this.props.content}</p>
                </div>
            </div>
        </div>

    }
}