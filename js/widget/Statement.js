import React, {Component} from 'react';

import DateFormat from './../util/Date';

export default class Statement extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            show: false
        }
    }

    _close(){
        localStorage.setItem('stmt_time', DateFormat.format(Date.now(), 'yyyy-MM-dd'))
        this.setState({
            show: false
        })
    }

    show() {
        this.setState({
            show: true
        })
    }

    render(){
        return (
            <div style={this.state.show ? { display: 'block' } : { display: 'none' }} >
                <div className="mask"></div>
                <div className="mail-box" style={{top: '300px', left: '45%', width: '648px'}}>
                    <div className='box-title' style={{border: 0, backgroundColor: '#FFF', lineHeight: '80px', height: '80px', textAlign: 'center', fontSize: '24px', color: '#FF801A' }}>会员资格认证声明</div>
                    <div style={{ backgroundColor: '#F4F5F6'}}>
                        <p style={{ color: '#333333',textIndent: '2em',textAlign: 'left',padding: '20px 40px',fontSize: '18px',lineHeight: '32px'}}>
                            长富云严格遵守《私募投资基金募集行为管理办法》，只向特定的合格投资者推介相关私募投资基金产品。私募基金的合格投资者是指具备相应风险识别能力和风险承担能力，投资与单只私募基金的金额不低于100万元，且近三年个人年均收入不低于50万元或者个人金额资产不低于300万元人民币。
                        </p>
                        <div style={{marginLeft: '40px',textAlign: 'left'}}>
                            <img src="/images/userPc/state-check.png" style={{width: '22px',height: '22px'}}/>
                            <span style={{ marginLeft: '10px', color: '#666', fontSize: '16px'}}>本人自愿遵守以上规定</span>
                        </div>
                        <div style={{padding: '30px 0 26px'}}>
                            <div onClick={this._close.bind(this)} style={{cursor: 'pointer', width: '240px', height: '40px', lineHeight: '40px',textAlign: 'center',margin: '0 auto',backgroundColor: '#FF801A',borderRadius: '4px',fontSize: '16px',color: '#FFFFFF'}}>我知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}