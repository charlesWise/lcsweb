'use strict'
//修改联系地址
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class ModifyContactAddress extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            errMsg: ''
        }
    }

    _modifyAddress(){
        let address = this.refs.address.value;
        if(!address){
            this.setState({
                errMsg: '请输入联系地址'
            })
            return;
        }
        Http.modifyAddress({
            address: address
        }).success((data, next) => {
            if (data.boolen) {
                this.props.selected && this.props.selected(1)
            }
        }).error((data, next) => {
            alert(data.message)
        })
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 联系地址</h3>
                    <div className="modify modify-address">
                        <label>联系地址：</label>
                        <textarea ref='address' type="text" placeholder="请输入联系地址" onFocus={()=>{
                            this.setState({
                                errMsg: ''
                            })
                        }}/>
                        <div style={{ marginLeft: '60px', marginBottom: '10px', height: '20px', color: '#F00'}}>
                            {this.state.errMsg}
                        </div>
                        <p><button onClick={this._modifyAddress.bind(this)}>提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
