'use strict'
//账户中心右侧
import React from 'react';
import AccountOverview from "./AccountMain/AccountOverview";
import PersonalData from "./AccountMain/PersonalData";
import Reward from "./AccountMain/Reward";
import Collection from "./AccountMain/Collection";

import ApplyContract from "./AccountMain/ApplyContract";
import ApplyWrapper from "./AccountMain/ApplyWrapper";
import Message from "./AccountMain/Message";
import ProfessionalCertification from "./AccountMain/ProfessionalCertification";
import ModifyContactAddress from "./AccountMain/ModifyContactAddress";
import ModifyLoginPwd from "./AccountMain/ModifyLoginPwd";
import ModifyName from "./AccountMain/ModifyName";
import ModifyPhone from "./AccountMain/ModifyPhone";
import ModifyServiceArea from "./AccountMain/ModifyServiceArea";
import ModifyTxPwd from "./AccountMain/ModifyTxPwd";
import AddCard from "./AccountMain/AddCard";
import BankCard from "./AccountMain/BankCard";

import Declaration from "./AccountMain/Declaration";
import AccumulatedEarn from "./AccountMain/AccumulatedEarn";
import Withdrawals from "./AccountMain/Withdrawals";
import FundRecord from "./AccountMain/FundRecord";
import AccumulatedInvest from "./AccountMain/AccumulatedInvest";
import PresentRecord from "./AccountMain/PresentRecord";
import UploadAvatar from "./AccountMain/UploadAvatar";
import CheckBankCard from "./AccountMain/CheckBankCard";
const Views = [
    AccountOverview,//0
    PersonalData,//1个人资料
    Withdrawals,//2
    Reward,//3
    Collection,//4
    Message,//5
    ApplyWrapper,//6我的合同
    ProfessionalCertification,//7理财师认证
    ModifyContactAddress,//8修改合同地址
    ModifyLoginPwd,//9密码修改
    ModifyName,//10身份修改
    ModifyPhone,//11修改手机号
    ModifyServiceArea,//12修改服务区域
    ModifyTxPwd,//13修改提现密码
    BankCard,//14银行卡管理
    AddCard,//15添加银行卡
    AccumulatedInvest,//16累计投资
    AccumulatedEarn,//17累计赚取
    FundRecord,//18资金记录
    Declaration,//19保单
    UploadAvatar,//20上传头像
    CheckBankCard//21上传头像
]
export default class AccountMain extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        let curIndex = this.props && this.props.curIndex || 0;
        let Child = Views[curIndex];
        return <Child selected={this.props.selected.bind(this)} data={this.props.data} />
    }
}
