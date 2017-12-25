'use strict'
//职业认证
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class ProfessionalCertification extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            img1: '',
            img2: '',
            isChecked: true
        }
    }

    componentDidMount() {
        this._checkIE()
    }

    _checkIE() {
        let str = navigator.appVersion;
        if (navigator.appName == 'Microsoft Internet Explorer' && str.indexOf("MSIE 9.0") > 0) {
            console.log('true!');
            this.setState({
                isIE: true
            })
        }
    }

    _getBase64(type, file){
        if (window.FileReader) {
            var reader = new FileReader();

            reader.addEventListener("load",  ()=> {
                if(type == 1){
                    this.setState({
                        img1: reader.result
                    })
                }else{
                    this.setState({
                        img2: reader.result
                    })
                }
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        } 
    }

    _doSubmit() {
        if (!this.state.isChecked) return;
        let fileone = this.refs.fileone.files[0];
        let filetwo = this.refs.filetwo.files[0];
        if(!fileone || !filetwo) return;
        let data = new FormData();
        data.append('fileone', this.refs.fileone.files[0])
        data.append('filetwo', this.refs.filetwo.files[0])
        Http.jobConfirm(data).success((data, next) => {
            window.Prompt.success('提交成功！', () => {
                this.props.selected && this.props.selected(1)
            })
        }).error((data, next) => {
            window.Prompt.error(data.message)
        })
    }

    _doIeSubmit() {

        let self = this;
        let $form = $('#auth')

        var options = {
            url: '/api/Api/User/jobConfirm',
            method: 'POST',
            data: {
                user_token: localStorage.getItem('user_token') || '',
                access_token: localStorage.getItem('accessToken') || '',
                client_platform: 'pc'
            },
            beforeSubmit: function () {
                if (!self.state.isChecked) return false;
            },
            success: function (res) {
                if (res.boolen == 1) {
                    window.Prompt.success('提交成功！', () => {
                        self.props.selected && self.props.selected(1)
                    })
                } else {
                    window.Prompt.error(res.message)
                }
            },
            resetForm: false,
            dataType: 'json'
        };
        $form.submit(function () {
            $(this).ajaxSubmit(options);
            return false;
        });
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 职业认证</h3>
                    
                    {
                        this.state.isIE ?
                            <div className="modify modify-authentication" style={{ marginTop: '0'}}>
                                <form id='auth' method="post">
                                    <div style={{ margin: '28px 0'}}>
                                        <span style={{ marginRight: '15px' }}>名片认证</span>
                                        <input type="file" className="chooseImg" name="fileone" accept="image/*" />
                                    </div>
                                    <div style={{ margin: '28px 0' }}>
                                        <span style={{ marginRight: '15px' }}>AFP/CFP认证</span>
                                        <input type="file" className="chooseImg" name="filetwo" accept="image/*" />
                                    </div>
                                    <div className="isAgree">
                                        <img style={{
                                            cursor: 'pointer',
                                            marginRight: '10px'
                                        }} src={this.state.isChecked ? "/images/userPc/isAgree.png" : "/images/userPc/notAgree.png"}
                                            onClick={() => {
                                                this.setState({
                                                    isChecked: !this.state.isChecked
                                                })
                                            }}
                                        />
                                        我已阅读并同意<em><a href="/protocol.html" target='_blank'>《长富云理财师服务协议》</a></em>
                                    </div>
                                    <div style={{
                                        height: '25px',
                                        color: '#F00'
                                    }}>{this.state.isChecked ? '' : '*请阅读《长富云理财师服务协议》'}</div>
                                    <div style={{ marginTop: '10px' }} className="modify"><button onClick={this._doIeSubmit.bind(this)} style={{ marginLeft: '0' }}>提交认证</button></div>
                                </form>
                            </div>
                            :
                            <div>
                                <div className="modify modify-authentication">
                                    <div className="authentication-act" onClick={() => {
                                        this.refs.fileone.click()
                                    }}>
                                        <a><em>名片认证</em></a>
                                        {
                                            !!this.state.img1 &&
                                            <img src={this.state.img1} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', display: 'block' }} />
                                        }
                                        <input ref='fileone' type="file" onChange={(event) => {
                                            let file = event.target.files[0];
                                            this._getBase64(1, file)
                                        }} accept="image/png, image/jpeg" style={{ visibility: 'hidden' }} />
                                    </div>
                                    <div className="authentication-act noth" onClick={() => {
                                        this.refs.filetwo.click()
                                    }}>
                                        <a><em>AFP/CFP认证</em></a>
                                        {
                                            !!this.state.img2 &&
                                            <img src={this.state.img2} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', display: 'block' }} />
                                        }
                                        <input ref='filetwo' type="file" onChange={(event) => {
                                            let file = event.target.files[0];
                                            this._getBase64(2, file)
                                        }} accept="image/png, image/jpeg" style={{ visibility: 'hidden' }} />
                                    </div>
                                </div>
                                <div className="isAgree" style={{marginBottom: '15px'}}>
                                    <img style={{
                                        cursor: 'pointer',
                                        marginRight: '10px'
                                    }} src={this.state.isChecked ? "/images/userPc/isAgree.png" : "/images/userPc/notAgree.png" }
                                        onClick={()=>{
                                            this.setState({
                                                isChecked: !this.state.isChecked
                                            })
                                        }}
                                    />
                                    我已阅读并同意<em><a href="/protocol.html" target='_blank'>《长富云理财师服务协议》</a></em>
                                </div>
                                <div style={{
                                    height: '25px',
                                    color: '#F00'
                                }}>{this.state.isChecked ? '' : '*请阅读《长富云理财师服务协议》' }</div>
                                <div style={{ marginTop: '10px'}} className="modify"><button onClick={this._doSubmit.bind(this)} style={{ marginLeft: '0' }}>提交认证</button></div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
