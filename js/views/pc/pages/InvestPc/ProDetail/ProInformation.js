'use strict'
//查看文件
import React from 'react';

import copy from './../../../../../util/Copy';

var info = ''

export default class ProHighlights extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            detail: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let detail = nextProps.detailInfo || {};
        this.setState({
            detail: detail
        })
    }

    render() {
        let detail = this.props.detailInfo || {};
        return (
            <div className="detail-cont-div1">
                {
                    detail.fund_items &&
                    <div>
                        <ul>
                            {
                                detail.fund_items.map((item, index, arr) => {
                                    if (!item.value || item.value == '') return;
                                    info += item.name + ":" + item.value + '\r\n';
                                    return (
                                        <li key={index}><em>{item.name}：</em>{item.value}</li>
                                    )
                                })
                            }
                        </ul>
                        <p className="detail-copy" onClick={() => {
                            let res = copy(info)
                            if (res) {
                                window.Prompt.success('复制成功！')
                            }
                        }}><a className="icon-copy"></a>复制产品信息</p>
                    </div>
                }

                {
                    (detail.account_holder || detail.bank_account || detail.keep_bank || detail.remark)&&
                    <div>
                        <h3>募集账户</h3>
                        <ul>
                            <li><em>[账户名]  </em>{detail.account_holder || ''}</li>
                            <li><em>[账户号]  </em>{detail.bank_account || ''}</li>
                            <li><em>[开户行]  </em>{detail.keep_bank || ''}</li>
                            <li style={{ width: '100%' }}><em>[备注]    </em>{detail.remark || ''}</li>
                        </ul>
                        <p className="detail-copy" onClick={() => {
                            let res = copy('[账户名]  ' + detail.account_holder + '\r\n' + '[账户号]  ' + detail.bank_account + '\r\n' + '[开户行]  ' + detail.keep_bank)
                            if (res) {
                                window.Prompt.success('复制成功！')
                            }
                        }}><a className="icon-copy"></a>复制募集账户</p>
                    </div>
                }
                {
                    detail.access &&
                    <div>
                        <h3>产品准入</h3>
                        <ul className="detail-heig" dangerouslySetInnerHTML={{
                            __html: detail.access || ''
                        }} />
                        <p className="detail-copy" onClick={() => {
                            let res = copy(detail.access || '')
                            if (res) {
                                window.Prompt.success('复制成功！')
                            }
                        }}><a className="icon-copy"></a>复制产品准入</p>
                    </div>
                }
            </div>
        )
    }
}
