'use strict'
//报单
import React from 'react';
import Http from './../../../../../controller/pcapi';
import Prompt from '../../../../../widget/Prompt';

export default class Declaration extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            info:{},
            card1:'',
            card2:'',
            card3:'',
            card4:'',
            card5:'',
            data:'',
            showTypes:false,
            types:[],
            curType:'',
            amount:0,//佣金金额
            dateId:'',//期限ID
            isIE:false
        }
    }


    chooseLocalImg(file,status){
        let data = this.state.data || new FormData();
        switch (status){
            case 1:
                if (file) {
                    data.append('idcardz',file);
                    let reader = new FileReader();
                    reader.onload = ( event )=>{
                        let base_64 = event.target.result;
                        this.setState({
                            card1:base_64,
                            data:data
                        })
                    };
                    reader.readAsDataURL( file );
                }
                break;
            case 2:
                if (file) {
                    data.append('idcardf',file);
                    let reader = new FileReader();
                    reader.onload = ( event )=>{
                        let base_64 = event.target.result;
                        this.setState({
                            card2:base_64,
                            data:data
                        })
                    };
                    reader.readAsDataURL( file );
                }
                break;
            case 3:
                if (file) {
                    data.append('bankcard',file);
                    let reader = new FileReader();
                    reader.onload = ( event )=>{
                        let base_64 = event.target.result;
                        this.setState({
                            card3:base_64,
                            data:data
                        })
                    };
                    reader.readAsDataURL( file );
                }
                break;
            case 4:
                if (file) {
                    data.append('paynote',file);
                    let reader = new FileReader();
                    reader.onload = ( event )=>{
                        let base_64 = event.target.result;
                        this.setState({
                            card4:base_64,
                            data:data
                        })
                    };
                    reader.readAsDataURL( file );
                }
                break;
            case 5:
                if (file) {
                    data.append('othernote',file);
                    let reader = new FileReader();
                    reader.onload = ( event )=>{
                        let base_64 = event.target.result;
                        this.setState({
                            card5:base_64,
                            data:data
                        })
                    };
                    reader.readAsDataURL( file );
                }
                break;
        }
    }

    _submit(){
        if(this.state.isIE){
            this._doIeSubmit()
        }else{
            this._notIeSubmit();
        }
    }

    _doIeSubmit(){

        this.refs.pmoney.value = this.refs.amount.value * 10000;
        this.refs.pdate.value = $('input[name="pdate_submit"]').val();

        let $form = $('#declaration')

        //$form.on('submit', function (event) {
        //    event.stopPropagation();
        //    event.preventDefault();
        //});
        let that = this;
        var options = {
            url: '/api/Api/TradingCenter/baodanSubmit',
            method: 'POST',
            data: {
                user_token: localStorage.getItem('user_token') || '',
                access_token: localStorage.getItem('accessToken') || '',
                client_platform: 'pc'
            },
            beforeSubmit: function(){},  //提交前处理
            success: function (res) {
                if (res.boolen == 1) {
                    window.Prompt.success('报单成功！', () => {
                        that.props.selected && that.props.selected(0)
                    })
                }else{
                    window.Prompt.error(res.message)
                }
            },  //处理完成 
            resetForm: false,
            dataType: 'json'
        };
        $form.on('submit', function (event) {
            event.stopPropagation();
            event.preventDefault()
            $(this).ajaxSubmit(options);
            return false;
        });
    }

    _notIeSubmit(){
        let data = this.state.data || new FormData();
        if(this.state.card1!='' && this.state.card2!='' && this.state.card3!='' && this.state.card4!=''){
            if(this.refs.amount.value<100){
                window.Prompt.error('打款金额不能低于100万');
                return;
            }
        }else{
            if(!this.state.isIE) {
                if (this.state.card1 == '') {
                    window.Prompt.error('请上传身份证正面');
                    return;
                } else if (this.state.card2 == '') {
                    window.Prompt.error('请上传身份证反面');
                    return;
                } else if (this.state.card3 == '') {
                    window.Prompt.error('请上传银行卡附件');
                    return;
                } else if (this.state.card4 == '') {
                    window.Prompt.error('请上传打款凭条附件');
                    return;
                }
            }
        }
        data.append('id',this.props.data && this.props.data.id||'');
        data.append('investor_name',this.refs.name.value||'');
        data.append('investor_person_id',this.refs.certificate.value||'');
        data.append('pay_date', $('input[name="pdate_submit"]').val() || '');
        data.append('pay_money',(this.refs.amount.value * 10000) ||'');
        data.append('remark',this.refs.remark.value||'');
        data.append('yield_id',this.state.dateId||'');
        data.append('m_amount',this.state.amount||'');
        Http.baodanSubmit(data).success((data, next)=>{
            window.Prompt.success(data.message, () => {
                this.props.selected && this.props.selected(0)
            })
            this.refs.name.value = '';
            this.refs.certificate.value = '';
            this.refs.date.value = '';
            this.refs.amount.value = '';
            this.refs.remark.value = '';
            this.setState({
                card1:'',
                card2:'',
                card3:'',
                card4:'',
                card5:'',
            })
        }).error((e)=>{
            window.Prompt.error(e.message);
        })
    }

    fetchData(id){
        Http.baodanOne({id}).success((data, next)=>{
            this.refs.yid.value = data.data.yield && data.data.yield[0].id;
            this.setState({
                info: data.data,
                curType:data.data.yield && data.data.yield[0].label_title,
                dateId:data.data.yield && data.data.yield[0].id
            })
        })
    }

    selectType(id,date){
        this.refs.yid.value = id;
        this.setState({
            curType:date,
            showTypes:false,
            dateId:id
        })
    }

    calculate(value){
        let amount = value * 10000;
        let fund_id = this.state.info && this.state.info.fund_id;
        let yield_id = this.state.dateId;
        Http.getBackAmount({amount,fund_id,yield_id}).success((data, next)=>{
            this.refs.mamount.value = data && data.data.amount;
            this.setState({
                amount:data && data.data.amount
            })
        }).error((data)=>{
            this.refs.mamount.value = 0;
            this.setState({
                amount:0
            })
        })
    }

    initDate(){
        var $input = $( '.datepicker' ).pickadate({
            formatSubmit: 'yyyy/mm/dd',
            container: '#container',
            editable: false,
            closeOnSelect: true,
            closeOnClear: false
        })
        var picker = $input.pickadate('picker')
    }

    checkIE(){
        let str = navigator.appVersion;
        if(navigator.appName == 'Microsoft Internet Explorer' && str.indexOf("MSIE 9.0")>0){
            console.log('true!');
            this.setState({
                isIE:true
            })
        }
    }

    componentDidMount(){
        let id = this.props.data && this.props.data.id;
        this.fetchData(id);
        this.checkIE();
        this.initDate();
    }

    render(){
        let deadList = this.state.info && this.state.info.yield;
        return <div className="user-right">
            <div className="user-rg-cont">
                <form id='declaration' method="post" /*enctype="multipart/form-data"*/>
                    <h3>报单信息</h3>
                    <div className="declaration">
                        <p className="declaration_p1">产品信息</p>
                        <input type="hidden" name="id" value={this.props.data && this.props.data.id || ''} />
                        <input type="hidden" name="yield_id" ref='yid' />
                        <input type="hidden" name="m_amount" ref='mamount' />
                        <input type="hidden" name="pay_money" ref='pmoney' />
                        <input type="hidden" name="pay_date" ref='pdate' />
                        <p className="declaration_p2">
                            <span>产品名称：{this.state.info && this.state.info.fund_name}</span>
                            <span>产品类型：{this.state.info && this.state.info.fund_type}</span>
                            <div className="fund-sel" style={{display:'inline-block',width:'155px',color:'#999999',fontSize:'14px'}}>产品期限
                                <div className="fund-set">
                                    <p className="" onClick={()=>this.setState({showTypes:!this.state.showTypes})} style={{height:'22px'}}>{this.state.curType} <i></i></p>
                                    <ul className={this.state.showTypes?"fund-new":"dn"}>
                                        {
                                            deadList && deadList.map((item,index)=>{
                                                return <li key={index} onClick={()=>this.selectType(item.id,item.label_title)}>{item.label_title}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </p>
                    </div>
                    <div className="declaration">
                        <p className="declaration_p1">客户信息</p>
                        <p className="declaration_p2">客户姓名：<input type="text" name='investor_name' ref="name" className="short-input" placeholder="请输入客户姓名"/></p>
                        <p className="declaration_p2">证件号码：<input type="text" name='investor_person_id' ref="certificate" className="long-input" placeholder="请输入有效证件号码"/></p>
                    </div>
                    <div className="declaration">
                        <p className="declaration_p1">打款信息</p>
                        <p className="declaration_p2">打款金额：
                            <input type="text" className="short-input" placeholder="请输入打款金额" ref="amount" onChange={(e) => {
                                    this.calculate(e.target.value);
                    }}/>
                            万元 <span className="span-em">佣金金额：<em>{this.state.amount}元</em></span></p>
                        <p className="declaration_p2">打款日期：
                            <section className="section">
                                <input
                                    className="datepicker"
                                    name="pdate"
                                    ref= 'pay_date'
                                    type="text"
                                    autoFocus={false}/>

                                <div id="container"></div>
                            </section>
                        </p>
                        <p className="declaration_p2">备注(选填)：<textarea name='remark' type="text" placeholder="请输入备注信息" ref="remark"/></p>
                    </div>
                    {
                        this.state.isIE?
                            <div className="declaration no-border">
                                <p className="declaration_p1">身份证</p>
                                <p className="identity">
                                    <input type="file" className="chooseImg" name="idcardz" ref="fileOne" accept="image/*"/>
                                    <input type="file" className="chooseImg" name="idcardf" ref="fileTwo" accept="image/*"/>
                                </p>
                                <p className="add-pic">
                                    <p className="declaration_p1">银行卡</p>
                                    <input type="file" className="chooseImg" name="bankcard" ref="fileThree" accept="image/*"/>
                                    <p className="declaration_p1">打款凭条</p>
                                    <input type="file" className="chooseImg" name="paynote" ref="fileFourth" accept="image/*"/>
                                    <p className="declaration_p1">其他材料(选填)</p>
                                    <input type="file" className="chooseImg" name="othernote" ref="fileFifth" accept="image/*"/>
                                </p>
                            </div>
                            :
                            <div className="declaration no-border">
                                <p className="declaration_p1">身份证</p>
                                <p className="identity">
                        <span className="card_wrapper">
                            <img src={this.state.card1 || "/images/userPc/front.png"} className="file" onClick={()=>{
                                    this.refs.fileOne.click();
                                }}/>
                                        <input type="file" className="chooseImg dn" name="idcardz" ref="fileOne" accept="image/*" onChange={(e) => {
                                        let file = e.target.files[0];
                                        this.chooseLocalImg(file,1)
                            }}/>
                        </span>
                        <span className="card_wrapper">
                            <img src={this.state.card2 || "/images/userPc/behind.png"} className="file" onClick={()=>{
                                    this.refs.fileTwo.click();
                                }}/>
                                        <input type="file" className="chooseImg dn" name="idcardf" ref="fileTwo" accept="image/*" onChange={(e) => {
                                        let file = e.target.files[0];
                                        this.chooseLocalImg(file,2)
                            }}/>
                        </span>
                                </p>
                                <p className="add-pic">
                        <span className="card_wrapper">银行卡
                            <img src={this.state.card3 || "/images/userPc/add-pic.png"} className="file" onClick={()=>{
                                    this.refs.fileThree.click();
                                }}/>
                                        <input type="file" className="chooseImg dn" name="bankcard" ref="fileThree" accept="image/*" onChange={(e) => {
                                        let file = e.target.files[0];
                                        this.chooseLocalImg(file,3)
                            }}/>
                        </span>
                        <span className="card_wrapper" style={{marginLeft:'64px'}}>打款凭条
                            <img src={this.state.card4 || "/images/userPc/add-pic.png"} className="file" onClick={()=>{
                                    this.refs.fileFourth.click();
                                }}/>
                                        <input type="file" className="chooseImg dn" name="paynote" ref="fileFourth" accept="image/*" onChange={(e) => {
                                        let file = e.target.files[0];
                                        this.chooseLocalImg(file,4)
                            }}/>
                        </span>
                        <span className="card_wrapper">其他材料(选填)
                            <img src={this.state.card5 || "/images/userPc/add-pic.png"} className="file" onClick={()=>{
                                    this.refs.fileFifth.click();
                                }}/>
                                        <input type="file" className="chooseImg dn" name="othernote" ref="fileFifth" accept="image/*" onChange={(e) => {
                                        let file = e.target.files[0];
                                        this.chooseLocalImg(file,5)
                            }}/>
                        </span>
                                </p>
                            </div>
                    }
                    <div className="declaration-tips">
                        尊敬的会员：<br/>
                        1、上传身份证正反面、银行卡、打款凭条进行报单审核；<br/>
                        2、其他材料作为补充，可选择上传或者不上传。<br/>
                    </div>
                    {this.state.isIE && <button className="declaration-btn" onClick={() => this._submit()}>提交报单</button> }
                </form>
                {!this.state.isIE && <button type="button" className="declaration-btn" onClick={() => this._submit()}>提交报单</button> }
            </div>
        </div>
    }
}