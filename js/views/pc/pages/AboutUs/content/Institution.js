'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import {testName,testPhone,testAddress} from 'util/RegExp';

export default class Institution extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['机构入驻申请'],
            curNavIndex:0,
            isChecked1:false,
            isChecked2:false,
            card:'',
            certificateList:{},
            uploadImg:''
        }
    }
    chooseLocalImg(index){
        if(index==0){
            let file  = document.querySelector('input[type=file]').files[0];
            if (file) {
                let reader = new FileReader();
                this.upload(reader);
                reader.onload = function ( event ) {
                    let base_64 = event.target.result;
                    this.setState({
                        card:base_64
                    })
                    this.veryfyCertificate(index,file.name,file.size)
                }.bind(this);
                reader.readAsDataURL( file );
            }
        }else{
            let file  = document.querySelectorAll('input[type=file]')[index-1].files[0];
            if (file) {
                let reader = new FileReader();
                this.upload(reader);
                reader.onload = function ( event ) {
                    let base_64 = event.target.result;
                    switch(index){
                        case 1:
                            var obj = Object.assign(this.state.certificateList,{certificate1:base_64});
                            break;
                        case 2:
                            var obj = Object.assign(this.state.certificateList,{certificate2:base_64})
                            break;
                        case 3:
                            var obj = Object.assign(this.state.certificateList,{certificate3:base_64})
                            break;
                        case 4:
                            var obj = Object.assign(this.state.certificateList,{certificate4:base_64})
                            break;
                        case 5:
                            var obj = Object.assign(this.state.certificateList,{certificate5:base_64})
                            break;
                        case 6:
                            var obj = Object.assign(this.state.certificateList,{certificate6:base_64})
                            break;
                    }
                    this.setState({
                        certificateList:obj
                    })
                    this.veryfyCertificate(index,file.name,file.size)
                }.bind(this);
                reader.readAsDataURL( file );
            }
        }
    }

    upload(reader){
        reader.onloadstart = function(){        //开始读取
            console.log('start');
        };
        reader.onprogress = function(e){        //这个是定时触发的事件，文件较大的时候较明显
            var progress = '已完成：' + Math.round(e.loaded / e.total * 100)  + '%';
            console.log('uploading',progress);
        };
        reader.onabort = function(){        //用作取消上传功能
            console.log('abort');
        };
    }

    submitVerify(){     //提交认证
        let name = this.refs.name.value;
        let department = this.refs.department.value;
        let position = this.refs.position.value;
        let phone = this.refs.phone.value;
        let dynamicCode = this.refs.dynamicCode.value;
        let password = this.refs.password.value;
        let correctPassword = this.refs.correctPassword.value;

        console.log(name,department,position,phone,dynamicCode,password,correctPassword)

        this.verify({
            phone:13829288376,
            code:1234,
            pass:'abcde',
            corPass:'abcde',
        });
    }
    submitAudit(){      //提交审核
        let companyName = this.refs.companyName.value;
        let companyShortName = this.refs.companyShortName.value;
        let invitationCode = this.refs.invitationCode.value;
        console.log(companyName,companyShortName,invitationCode);
    }

    verify({phone,code,pass,corPass}){
        console.log(phone,code,pass,corPass)
    }

    veryfyCertificate(index,name,size){     //限制证书格式，大小
        let format = name.split('.')[1];
        if(format=='png' || format=='jpg'){
            if((size/1024)<2000){
                console.log('图片正确')
                return true;
            }else{
                console.log('图片大小不能超过2M')
                return false;
            }
        }else {
            console.log('图片格式不正确')
            return false;
        }
    }

    componentDidMount(){

    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex}/>
            <div className="about_content">
                <div className="top_nav">
                    <span className={this.state.curNavIndex==0?'current':''} onClick={()=>{this.setState({curNavIndex:0})}}>1.注册账户</span>
                    <span className={this.state.curNavIndex==1?'current':''} onClick={()=>{this.setState({curNavIndex:1})}}>2.提交审核</span>
                </div>
                {
                    this.state.curNavIndex==0?<div className="apply_content">
                        <p>
                            <span className="number">1</span>
                            <span className="title">您的联系方式</span>
                        </p>
                        <div className="info_wrapper">
                            <ul className="info_list">
                                <li>
                                    <p>联系人姓名：</p>
                                    <input type="text" placeholder="请输入联系人姓名" ref="name"/>
                                </li>
                                <li>
                                    <p>您的部门：</p>
                                    <input type="text" placeholder="请输入您的部门" ref="department"/>
                                </li>
                                <li>
                                    <p>您的职位：</p>
                                    <input type="text" placeholder="请输入职位" ref="position"/>
                                </li>
                            </ul>
                        </div>
                        <p>
                            <span className="number">2</span>
                            <span className="title">联系人名片</span>
                        </p>
                        <div className="card"  ref="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.card} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png" onChange={this.chooseLocalImg.bind(this,0)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">3</span>
                            <span className="title">设置账户信息</span>
                        </p>
                        <div className="info_wrapper">
                            <ul className="info_list">
                                <li>
                                    <p>登陆手机：</p>
                                    <input type="text" placeholder="请输入登录手机" ref="phone"/>
                                </li>
                                <li>
                                    <p>动态码：</p>
                                    <input type="text" placeholder="请输入动态码" className="dynamic_code" ref="dynamicCode"/>
                                    <button className="get_dynamic_code">获取验证码</button>
                                </li>
                            </ul>
                        </div>
                        <p>
                            <span className="number">4</span>
                            <span className="title">设置登录密码</span>
                        </p>
                        <div className="info_wrapper">
                            <ul className="info_list">
                                <li>
                                    <p>登陆密码：</p>
                                    <input type="text" placeholder="请输入8位以上密码" ref="password"/>
                                </li>
                                <li>
                                    <p>确认密码：</p>
                                    <input type="text" placeholder="请再次确认密码" ref="correctPassword"/>
                                </li>
                            </ul>
                        </div>
                        <p className="agree">
                            <i className={this.state.isChecked1?'check':'un_check'} onClick={()=>this.setState({isChecked1:!this.state.isChecked1})}></i>我同意遵守
                            <a href="">《长富云理财师机构管理办法》</a>
                        </p>
                        <button className="submit" onClick={this.submitVerify.bind(this)}>提交认证</button>
                    </div>:
                    this.state.curNavIndex==1?<div className="apply_content">
                        <p>
                            <span className="number">1</span>
                            <span className="title">公司认证资料</span>
                        </p>
                        <div className="info_wrapper">
                            <ul className="info_list">
                                <li>
                                    <p>公司名称：</p>
                                    <input type="text" placeholder="请输入您的公司名称" ref="companyName"/>
                                </li>
                                <li>
                                    <p>公司简称：</p>
                                    <input type="text" placeholder="请输入6位以内公司简称" ref="companyShortName"/>
                                </li>
                                <li>
                                    <p>邀请码：</p>
                                    <input type="text" placeholder="请输入邀请码" ref="invitationCode"/>
                                </li>
                            </ul>
                        </div>
                        <p>
                            <span className="number">2</span>
                            <span className="title">基金管理人登记证书</span>
                        </p>
                        <div className="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate1} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png" onChange={this.chooseLocalImg.bind(this,1)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">3</span>
                            <span className="title">公司营业执照</span>
                        </p>
                        <div className="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate2} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png"  onChange={this.chooseLocalImg.bind(this,2)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="tip">
                            <i className={this.state.isChecked2?'check':'un_check'} onClick={()=>this.setState({isChecked2:!this.state.isChecked2})}></i>本公司已三证合一
                        </div>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">4</span>
                            <span className="title">税务登记证</span>
                        </p>
                        <div className="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate3} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png" onChange={this.chooseLocalImg.bind(this,3)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">5</span>
                            <span className="title">组织机构代码证</span>
                        </p>
                        <div className="card" onClick={this.chooseLocalImg.bind(this,4)}>
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate4} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png"/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">6</span>
                            <span className="title">法人身份证</span>
                        </p>
                        <div className="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate5} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png" onChange={this.chooseLocalImg.bind(this,5)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <p>
                            <span className="number">7</span>
                            <span className="title">法人名片</span>
                        </p>
                        <div className="card">
                            <img src="/images/aboutUs/plus.png" alt=""/>
                            <img src={this.state.certificateList && this.state.certificateList.certificate6} alt="" className="uploadImg"/>
                            <input type="file" className="chooseImg" name="file" accept="jpg/png" onChange={this.chooseLocalImg.bind(this,6)}/>
                        </div>
                        <p className="des">文件格式为jpg，png，图片大小不大于2m</p>
                        <div className="btns">
                            <button className="left">取消上传</button>
                            <button className="right">开始上传</button>
                        </div>
                        <button className="submit" onClick={this.submitAudit.bind(this)}>提交审核</button>
                    </div>:''
                }

            </div>
        </div>
    }
}
