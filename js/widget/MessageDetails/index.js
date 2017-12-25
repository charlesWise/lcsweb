'use strict'
import React from 'react';
import ReactDom from 'react-dom';
import ServiceUrl from 'res/ServiceUrl';
import chttp from 'controller/chttp';
import Mlux from 'mlux';
import {
    Wrapper,Link
} from 'widget';

export default class MessageDetails extends React.Component{
    constructor(...props){
        super(...props);
        this.state = {
            messageList:[],
            btnNum:1,
            curPage:1,
            haveNext:0,
            isShowNextPage:true
        }
    }
    kill(type,id,isLog){ //出栏
        if(!isLog){ //查看日志
            Mlux.StoreManager.Details.assign({showLog:1});
        }else{  //出栏、采摘
            Mlux.StoreManager.Details.assign({showRipe:0});
        }
        if(type=='chick'){
            this.props.history.push('/details/web/chicken/'+id);
        }else{
            this.props.history.push('/details/web/'+type+'/'+id);
        }
    }
    changeSpecies(type,species) {
        if (type == 'buy') {
            if (species == 'chick' || species == 'duck' || species == 'pig') {
                if (species == 'chick' || species == 'duck') {
                    return {'adopt': '认养', 'slaughter': '出笼'};
                } else {
                    return {'adopt': '认养', 'slaughter': '出栏'};
                }
            } else {
                return {'adopt': '承租', 'slaughter': '到期'};
            }
        } else if (type == 'kill_notice') {
            if (species == 'chick' || species == 'duck' || species == 'pig') {
                if (species == 'chick' || species == 'duck') {
                    return {'adopt': '出笼', 'slaughter': '出笼'};
                } else {
                    return {'adopt': '出栏', 'slaughter': '出栏'};
                }
            } else {
                return {'adopt': '承租', 'slaughter': '采摘'};
            }
        }
    }
    onScroll(e){
        let scrollTop = ReactDom.findDOMNode(this.refs.container).scrollTop;
        let clientHeight = ReactDom.findDOMNode(this.refs.container).clientHeight;
        let scrollHeight = ReactDom.findDOMNode(this.refs.container).scrollHeight;
        //console.log(scrollTop,clientHeight,scrollHeight);
        if(scrollTop + clientHeight >= scrollHeight && this.state.isShowNextPage){
            this.setState({
                curPage:this.state.curPage+1,
                isShowNextPage:false
            })
        }
    }
    fetchData(page,pageNum){
        chttp.post(ServiceUrl.userNotice,{page:page,pageNum:pageNum}).then((content)=>{
            if(content.boolen == 1){
                this.setState({
                    messageList:this.state.messageList.concat(content.data.list),
                    haveNext:content.data.have_next
                })
            }
        });
    }
    showMore(){
        if(this.state.haveNext){
            this.fetchData(this.state.curPage,5);
            this.setState({
                isShowNextPage:true
            })
        }
    }
    componentDidMount(){
        this.fetchData(1,5);
    }

    onButtonClick(type,index){
      if(type == "resolve"){
        this.confirmGiveOrder(index);
      } else if (type == "reject") {
        this.refuseGiveOrder(index);
      }
    }

    //接收礼物
    confirmGiveOrder(index){
      let property_id = this.state.messageList[index].property_id;
      chttp.post(ServiceUrl.confirmGiveOrder,{property_id}).then((content)=> {
          if (content.boolen == 1) {
             this.fetchData(this.state.curPage,5);
          } else if(content.boolen == 0){
            window.NXSD.Toast.show(content.message);
          }
      });
    }

    //拒绝礼物
    refuseGiveOrder(index){
      let property_id = this.state.messageList[index].property_id;
      chttp.post(ServiceUrl.refuseGiveOrder,{property_id,status:2}).then((content)=> {
          if (content.boolen == 1) {
            this.fetchData(this.state.curPage,5);
          } else if(content.boolen == 0){
            window.NXSD.Toast.show(content.message);
          }
      });
    }

    render(){
        return <div>
                 <div className="detailed-box" >
                     <p className="detail-name">消息</p>
                     <a className="closed" onClick = {()=>this.props.onClose&&this.props.onClose()}></a>
                     <div className="message-wrapper" ref="container" onScroll = {(e)=>this.onScroll(e)} >
                     {
                         this.state.messageList.map((item,index)=>{
                             return <div key={index}>
                                 <h4 className="message-time">{item.ctime}</h4>
                                 <div className="envelope">
                                    <div className="message-top">
                                      {
                                        ["refuse_giving","confirm_giving"].indexOf(item.sys_type) == -1?<h3>{item.title}</h3>:item.sys_type == "confirm_giving"?<h3 style={{color:'#137b04'}}>{item.title}</h3>:item.sys_type == "refuse_giving"?<h3 style={{color:'#ff6000'}}>{item.title}</h3>:''
                                      }
                                      <p className="line"></p>
                                    </div>
                                     {
                                         item.sys_type == 'register' || item.sys_type == 'sys_kill'?    //注册，强制出栏，强制宰杀
                                             <div className="message-details">
                                                 <p>亲爱的小伙伴：</p>
                                                 {item.sys_type == 'register'?<p>{item.info}</p>:''}
                                                 <p>{item.content}</p>
                                             </div>:
                                             item.sys_type == 'buy'?    //认养
                                             <div className="message-details">
                                                 <p>亲爱的小伙伴：</p>
                                                 <p>{item.info}</p>
                                                 <p><span>{this.changeSpecies(item.sys_type,item.ele_type).adopt}时间：</span>{item.pay_time}</p>
                                                 <p><span>{this.changeSpecies(item.sys_type,item.ele_type).slaughter}时间：</span>{item.stock_time}</p>
                                                 <p><span>委托农场：</span>{item.farm_name}</p>
                                                 <p><span>{this.changeSpecies(item.sys_type,item.ele_type).adopt}费用：</span><em className="color2">￥{item.money}</em></p>
                                             </div>:
                                             item.sys_type == 'kill_notice'?    //出栏
                                             <div className="message-details">
                                                 <p>亲爱的小伙伴：</p>
                                                 <p>{item.info}</p>
                                                 <p><span>{this.changeSpecies(item.sys_type,item.ele_type).adopt}资产：</span>{item.product_type_name}</p>
                                                 <p><span>资产标识：</span>{item.product_no}</p>
                                                 <p><span>{this.changeSpecies(item.sys_type,item.ele_type).slaughter}日期：</span>{item.stock_time}</p>
                                                 <p><span>最迟{this.changeSpecies(item.sys_type,item.ele_type).slaughter}：</span>{item.life_time}</p>
                                                 <p><span>委托农场：</span>{item.farm_name}</p>
                                             </div>:
                                             item.sys_type == 'send'?   //配送
                                             <div className="message-details">
                                                 <p>亲爱的小伙伴：</p>
                                                 <p>{item.info}</p>
                                                 <p><span>配送时间：</span>{item.ctime}</p>
                                                 <p><span>配送物流：</span>{item.logistics_company_name}</p>
                                                 <p><span>物流单号：</span>{item.logistics_order_no}</p>
                                                 <p><span>配送农场：</span>{item.farm_name}</p>
                                             </div>:
                                             item.sys_type == 'feed'?   //饲养登记通知
                                                 <div className="message-details">
                                                     <p>亲爱的小伙伴：</p>
                                                     <p>{item.info}</p>
                                                     <p><span>登记时间：</span>{item.ctime}</p>
                                                     <p><span>登记资产：</span>{item.product_no}</p>
                                                     <p><span>登记农场：</span>{item.farm_name}</p>
                                                     <p><span>当前重量：</span>{item.weight}kg</p>
                                                     <p><span>健康状态：</span>{item.health}</p>
                                                 </div>:
                                             item.sys_type == 'sendEgg'?    //蛋配送
                                                 <div className="message-details">
                                                     <p>亲爱的小伙伴：</p>
                                                     <p>{item.info}</p>
                                                     <p><span>配送时间：</span>{item.ctime}</p>
                                                     <p><span>配送物流：</span>{item.logistics_company_name}</p>
                                                     <p><span>限流单号：</span>{item.logistics_order_no}</p>
                                                     <p><span>配送农场：</span>{item.farm_name}</p>
                                                 </div>:
                                             item.sys_type == 'disinfect'?    //卫生消毒登记通知
                                                 <div className="message-details">
                                                     <p>亲爱的小伙伴：</p>
                                                     <p>{item.info}</p>
                                                     <p><span>登记时间：</span>{item.ctime}</p>
                                                     <p><span>登记农场：</span>{item.farm_name}</p>
                                                 </div>:
                                             item.sys_type == 'over'?    //承租到期通知
                                                 <div className="message-details">
                                                     <p>亲爱的小伙伴：</p>
                                                     <p>{item.info}</p>
                                                     <p><span>承租资产：</span>{item.product_type_name}</p>
                                                     <p><span>资产标识：</span>{item.product_no}</p>
                                                     <p><span>到期时间：</span>{item.stock_time}</p>
                                                     <p><span>委托农场：</span>{item.farm_name}</p>
                                                 </div>:
                                                 ["refuse_giving","confirm_giving"].indexOf(item.sys_type) != -1?<div className="message-details">
                                                    <p>亲爱的小伙伴：</p>
                                                    <p>{item.info}</p>
                                                    <p><span>赠送时间：</span>{item.ctime}</p>
                                                    <p><span>赠送资产：</span>{item.product_no}</p>
                                                    <p><span>赠送物种：</span>{item.product_type_name}</p>
                                                    <p><span>受赠好友：</span><span style={{color:'#ff6000'}}>{item.send_name}</span></p>
                                                </div>:
                                                 item.sys_type == 'gift_giving'?<div className="message-details">
                                                    <p>亲爱的小伙伴：</p>
                                                    <p>{item.info}</p>
                                                    <p><span>赠送时间：</span>{item.ctime}</p>
                                                    <p><span>赠送资产：</span>{item.product_no}</p>
                                                    <p><span>赠送物种：</span>{item.product_type_name}</p>
                                                    <p><span>赠送好友：</span><span style={{color:'#ff6000'}}>{item.send_name}</span></p>
                                                    {
                                                      item.status == 2 || item.status == 3?<p><span>赠送状态：</span><span style={{color:'#ff6000'}}>{item.status == 2?"已受赠":"已拒收"}</span></p>:""
                                                    }
                                                </div>://免疫驱虫登记通知、日常视频登记通知、病情登记通知、病情治疗通知、病情治愈通知
                                                 <div className="message-details">
                                                     <p>亲爱的小伙伴：</p>
                                                     <p>{item.info}</p>
                                                     <p><span>登记时间：</span>{item.ctime}</p>
                                                     <p><span>登记资产：</span>{item.product_no}</p>
                                                     <p><span>登记农场：</span>{item.farm_name}</p>
                                                 </div>
                                     }
                                     {
                                     item.sys_type == 'kill_notice' || item.sys_type == 'over'  || item.sys_type == 'feed' || item.sys_type == 'disinfect' || item.sys_type == 'movie' || item.sys_type == 'fertilize'
                                     || item.sys_type == 'ill' || item.sys_type == 'illTreat' || item.sys_type == 'illCure' || item.sys_type == 'watering' || item.sys_type == 'immune' || item.sys_type == 'weed'?
                                     <div>
                                         <p className="line"></p>
                                         <div className="btns">
                                             {
                                                     item.sys_type == 'kill_notice' && (item.ele_type == 'chick' || item.ele_type == 'duck')?
                                                         <a onClick={this.kill.bind(this,item.ele_type,item.property_id)} className="green-btn"><span>确认出笼</span></a>:
                                                     item.sys_type == 'kill_notice' && item.ele_type == 'pig'?
                                                         <a onClick={this.kill.bind(this,item.ele_type,item.property_id)} className="green-btn"><span>确认出栏</span></a>:
                                                     item.sys_type == 'kill_notice' && (item.ele_type == 'tea' || item.ele_type == 'fruit')?
                                                         <a onClick={this.kill.bind(this,item.ele_type,item.property_id)} className="green-btn"><span>确认采摘</span></a>:
                                                     item.sys_type == 'over'?
                                                         <a onClick={this.kill.bind(this,item.ele_type,item.property_id)} className="green-btn"><span>重新承租</span></a>
                                                         :
                                                         <a className="green-btn"  onClick={this.kill.bind(this,item.ele_type,item.property_id,false)}><span>查看日志</span></a>
                                             }
                                         </div>
                                     </div>:item.sys_type == "gift_giving" && item.status == 1?<div>
                                       <p className="line"></p>
                                       <div className="btns">
                                           <a className="yellow-btn" style={{width: '6rem',marginRight: '1rem'}} onClick={()=>this.onButtonClick('reject',index)}><span>拒绝礼物</span></a>
                                           <a className="green-btn" style={{width: '6rem'}} onClick={()=>this.onButtonClick('resolve',index)}><span>接收礼物</span></a>
                                       </div>
                                     </div>:''
                                     }
                                     <img src="./images/loggedIn/stamp.png" alt="" className="stamp"/>
                                 </div>
                            </div>
                         })
                     }
                         {this.state.haveNext?<h4 onClick={this.showMore.bind(this)} className="show-more">点击查看更多</h4>:''}
                     </div>
                 </div>
        </div>
    }
}
