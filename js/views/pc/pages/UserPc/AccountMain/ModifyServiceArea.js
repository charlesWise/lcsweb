'use strict'
//修改服务区域
import React from 'react';

import Http from './../../../../../controller/pcapi';
import AreaSelect from './widget/AreaSelect';

export default class ModifyServiceArea extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            errMsg: ''
        }
    }

    _onSubmit(){
        let province = this.refs.AreaSelect.getProvince();
        let city = this.refs.AreaSelect.getCity();
        if (!city.name || !province.name){
            this.setState({
                errMsg: '请选择服务区域'
            })
            return;
        }
        Http.modifyArea({
            province: province.name,
            city: city.name
        }).success((data, next) => {
            if (data.boolen=='1') {
                this.props.selected && this.props.selected(1)
            }
        }).error((data, next) => {
            alert(data.message)
        })
    }

    _onSelected(){
        this.setState({
            errMsg: ''
        })
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 服务区域</h3>
                    <div className="modify modify-select">
                        <em style={{ float: 'left' }}>服务区域：</em>
                        <AreaSelect ref='AreaSelect' onSelected={this._onSelected.bind(this)}/>
                        <div style={{ color: '#F00' }}>{this.state.errMsg}</div>
                        <p><button onClick={this._onSubmit.bind(this)} >提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
