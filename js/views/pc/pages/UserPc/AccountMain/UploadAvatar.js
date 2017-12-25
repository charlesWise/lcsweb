'use strict'
//账户中心左侧
import React from 'react';
// import AvatarEditor from 'react-avatar-editor'

import Http from './../../../../../controller/pcapi';

export default class UploadAvatar extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            position: { x: 0.5, y: 0.5 }
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

    _modifyAvatar(file) {
        if (!file) return;
        let data = new FormData();
        data.append('file', file, 'ava.png')
        Http.modifyAvatar(data).success((data, next) => {
            window.location.reload()
        }).error((data, next)=>{
            window.Prompt.error(data.message)
        })
    }

    _handleNewImage (e) {
        this.setState({ image: e.target.files[0] })
    }

    _handleSave() {
        let img = this.refs.editor.getImageScaledToCanvas().toDataURL()
        let imgFile = this._convertBase64UrlToBlob(img)

        this._modifyAvatar(imgFile)
    }
    
    _convertBase64UrlToBlob(urlData) {
        //去掉url的头，并转换为byte  
        var bytes = window.atob(urlData.split(',')[1]);

        //处理异常,将ascii码小于0的转换为大于0  
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], { type: 'image/png' });
    }  

    _handlePositionChange(position) {
        this.setState({ position })
    }

    _getBase64(file){
        if (window.FileReader) {
            var reader = new FileReader();

            reader.addEventListener("load", () => {
                this.setState({
                    img: reader.result
                })
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    _upload() {
        let file = this.refs.fileone.files[0];
        if (!file) return;
        let data = new FormData();
        data.append('file', file, 'ava.png')
        Http.modifyAvatar(data).success((data, next) => {
            window.Prompt.success('上传成功！', () => {
                window.location.reload()
            })
        }).error((data, next) => {
            window.Prompt.error(data.message)
        })
    }

    _ieUpload() {

        let $form = $('#ava')

        var options = {
            url: '/api/Api/UserCenter/ModifyAvatar',
            method: 'POST',
            data: {
                user_token: localStorage.getItem('user_token') || '',
                access_token: localStorage.getItem('accessToken') || '',
                client_platform: 'pc'
            },
            beforeSubmit: function () { },
            success: function (res) {
                if (res.boolen == 1) {
                    window.Prompt.success('上传成功！', () => {
                        window.location.reload()
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
                    <h3>编辑头像</h3>
                    <h4 className="ua-tips">*为了增加彰显您的个性，来设置头像吧！<span>（支持jpg、png、或bmp格式，可以在大照片中剪切满意的部分。）</span></h4>
                    
                    {
                        this.state.isIE ?
                            <div style={{
                                paddingTop: '40px'
                            }}>
                                <form id='ava' method="post">
                                    <input type="file" className="chooseImg" name="file" accept="image/*" />
                                    <div className="modify"><button onClick={() => this._ieUpload()} style={{ marginLeft: '0' }}>上传头像</button></div>
                                </form>
                            </div>
                            :
                            <div className="UploadAvatar">

                                {
                                    !!this.state.img ?
                                        <img src={this.state.img} className='ua-click' />
                                        :
                                        <a className="ua-click">
                                            <i></i>
                                            <em>选择一张本地图片<br />编辑后上传</em>
                                        </a>
                                }

                                <input ref='fileone' onChange={(event) => {
                                    let file = event.target.files[0];
                                    this._getBase64(file)
                                }} accept="image/*" style={{ visibility: 'hidden' }} type="file" />
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <button className="ua-btn-l" onClick={() => {
                                            this.refs.fileone.click()
                                        }}>选择图片</button>
                                    </div>
                                    <button onClick={this._upload.bind(this)} className="ua-btn-r" style={{ float: 'none', marginLeft: '1em' }}>上传头像</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
