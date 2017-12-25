'use strict'

import React from 'react';

import copy from './../../../../../util/Copy';

export default class ProHighlights extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
        }
    }

    render() {
        let detail = this.props.detailInfo || {};
        return (
            <div className="detail-cont-div1">
                <ul className="detail-heig" dangerouslySetInnerHTML={{
                    __html: detail.fund_highlight || ''
                }} />
                <p className="detail-copy" onClick={() => {
                    let res = copy(detail.fund_highlight || '')
                    if (res) {
                        window.Prompt.success('复制成功！')
                    }
                }}><a className="icon-copy"></a>复制产品亮点</p>
            </div>
        )
    }
}
