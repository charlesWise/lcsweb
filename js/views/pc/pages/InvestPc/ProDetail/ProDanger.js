'use strict'
//查看文件
import React from 'react';

import copy from './../../../../../util/Copy';

export default class ProDanger extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
        }
    }

    render() {
        let detail = this.props.detailInfo || {};
        return (
            <div className="detail-cont-div2">
                <h3>风险评估</h3>

                {detail.ltv_ratio && <p><em>抵/质押率</em>{detail.ltv_ratio.trim() || ''}</p>}
                {detail.fund_company && <p><em>融资主体 </em>{detail.fund_company.trim() || ''}</p>}
                {detail.fund_invest_at && <p><em>资金用途 </em>{detail.fund_invest_at.trim() || ''}</p>}
                {detail.return_source && <p><em>还款来源 </em>{detail.return_source.trim() || ''}</p>}

                {detail.invest_risk_ctrl && <h3>风险控制</h3>}
                {
                    detail.invest_risk_ctrl && 
                    <p className="gray54" dangerouslySetInnerHTML={{
                        __html: detail.invest_risk_ctrl || ''
                    }} />
                }
                <p className="detail-copy" onClick={()=>{
                    let res = copy(detail.invest_risk_ctrl || '')
                    if(res){
                        window.Prompt.success('复制成功！')
                    }
                }}><a className="icon-copy"></a>复制风险措施</p>
            </div>
        )
    }
}
