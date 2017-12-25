'use strict'
//注册右侧
import React from 'react';

export default class RegisterRight extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="reg-r">
                <ul>
                    <li>
                        <img src="/images/index/sy-tu1.png" />
                        <div>
                            <h2>优质产品</h2>
                            <p>百亿优质包销产品精选提供</p>
                        </div>
                    </li>
                    <li>
                        <img src="/images/index/sy-tu2.png" />
                        <div>
                            <h2>快速结佣</h2>
                            <p>全国首家佣金线上结算，财富快人一步</p>
                        </div>
                    </li>
                    <li>
                        <img src="/images/index/sy-tu3.png" />
                        <div>
                            <h2>上市公司背景</h2>
                            <p>拥有香港主板上市公司（00850.HK）背景</p>
                        </div>
                    </li>
                    <li>
                        <img src="/images/index/sy-tu4.png" />
                        <div>
                            <h2>专属服务</h2>
                            <p>真正实现互联网+理财师一站式服务平台</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
