'use strict'
var context = '/proxy';
export default {
    getAccessToken: '/Api/Public/GetAccessToken',
    sendMobileCode: '/Api/Public/SendMobileCode',
    indexInit: '/Api/Public/IndexInit',
    getAgreement: '/Api/Public/GetAgreement',

    //用户登录
    login: '/Api/User/Login',
    //用户注册
    checkRegMobile:'/Api/User/checkRegMobile',
    validateMobileCode: '/Api/Public/ValidateMobileCode',
    register: '/Api/User/Register',
    pcRegister: '/Pc/UserPc/Register',
    getAgreement:'/Api/Public/GetAgreement',
    getContacts: '/Api/Public/getContacts',

    //忘记密码
    findPasswordCheck: '/Api/User/FindPasswordCheck',
    findPasswordSave: '/Api/User/FindPasswordSave',

    //个人中心
    getUserProfile: '/Api/UserCenter/GetUserProfile',
    modifyPerson: '/Api/UserCenter/ModifyPerson',
    modifyPassword: '/Api/UserCenter/ModifyPassword',
    changePaypwd: '/Api/Cash/changePaypwd',
    modifyAddress:'/Api/UserCenter/ModifyAddress',

    getBankList: '/Api/TradingCenter/GetBankList',//银行卡列表
    addCard: '/Api/Card/addCard',//添加银行卡
    getSelectBankList: '/Api/TradingCenter/GetSelectBankList',//可添加银行卡列表
    getAccountInfo: '/Api/TradingCenter/GetAccountInfo',//账户信息
    bookingOrder: '/Api/TradingCenter/BookingOrder',//订单列表

    //图形验证码
    getCaptchaImage: '/Api/Public/GetCaptchaImage',

    //列表筛选项
    searchFields: '/Api/FundCenter/searchFields',
    searchFund: '/Api/FundCenter/SearchFund',
    pcSearchFields: '/Pc/FundCenterPc/searchFields',
    fundList:'/Pc/FundCenterPc/FundList',

    //关于我们
    noticeList:'/Api/Annc/showList',    //公告列表
    //noticeList:'/Pc/AboutPc/showList',    //公告列表
    anncDetail:'/Pc/AboutPc/anncDetail',    //公告详情
    roadshowList:'/Api/Public/roadshowList',  //路演视频
    getActivityList:'/Api/UserCenter/getActivityList',   //活动列表
    infoList:'/Api/Public/infoList',    //新闻资讯
    activityList:'/Api/UserCenter/getActivityList',   //平台活动
    mediaList:'/Pc/AboutPc/mediaList',   //媒体报道
    mediaDetail:'/Pc/AboutPc/mediaDetail',   //媒体详情
    parnerList:'/Pc/AboutPc/parnerList',  //合作伙伴
    feedbackList:'/Api/UserCenter/feedbackList',  //反馈列表
    reportFeedback:'/Api/UserCenter/reportFeedback',  //提交反馈

    messageList:'/Pc/UserCenterPc/messageList',   //消息列表
    getUserMessageById:'/Pc/UserCenterPc/getUserMessageById',    //消息详情
    setReaded:'/Pc/UserCenterPc/setReaded', //全部标为已读
    fundFavor:'/Api/TradingCenter/FundFavor',    //我的收藏
    DelFavor:'/Api/FundCenter/DelFavor',//取消收藏
    TicketsList:'/Api/TradingCenter/TicketsList', //我的奖励

    oneType:'/Api/Cash/oneType',  //资金记录
    //cashout:'/Api/Payment/cashout', //提现
    cashout:'/Pc/PaymentPc/cashout', //提现
    outList:'/Pc/CashPc/outList', //提现记录
    cashSearchFields:'Pc/CashPc/searchFields',  //提现记录筛选
    //CommInfo:'/Pc/TradingCenterPc/CommInfo', //累计赚取,累计投资
    CommInfo:'/Pc/TradingCenterPc/tradingFundInfo', //累计赚取,累计投资
    applyCash:'/Api/Cash/applyCash',//默认银行卡信息
    outdetail:'/Api/Cash/outdetail', //提现返回结果
    baodanOne:'/Api/TradingCenter/baodanOne',//保单信息
    baodanSubmit:'/Api/TradingCenter/baodanSubmit',//报单提交
    //产品详情
    fundDetail: '/Api/FundCenter/FundDetail',
    addToFavor: '/Api/FundCenter/AddToFavor',
    delFavor: '/Api/FundCenter/DelFavor',
    getDefaultAddr: '/Api/TradingCenter/GetDefaultAddr',
    addToBookingOrder: '/Api/FundCenter/AddToBookingOrder',
    getBackAmount: '/Api/FundCenter/GetBackAmount',

    //
    fundContractList: '/Api/TradingCenter/FundContractList',
    getBackAddress: '/Api/TradingCenter/GetBackAddress',
    getAddressList: '/Api/TradingCenter/GetAddressList',

    editAddress: '/Api/TradingCenter/EditAddress',

    tSearchFund: '/Api/TradingCenter/SearchFund',//fund_name
    applyFundContract: '/Api/TradingCenter/ApplyFundContract',
    modifyMobile: '/Pc/UserCenterPc/modifyMobile',
    modifyArea: '/Api/UserCenter/ModifyArea',

    getActivityListIndex: '/Pc/PublicPc/getActivityList',
    jobConfirm: '/Api/User/jobConfirm',
    modifyAvatar: '/Api/UserCenter/ModifyAvatar',
    fundLoad: '/Pc/FundCenterPc/fundLoad',
    delBank: '/Api/TradingCenter/DelBank',
    setDefaultAddress: '/Api/TradingCenter/SetDefaultAddress',
    delAddress: '/Api/TradingCenter/DelAddress',
    orderNum: '/Api/TradingCenter/bookingOrderNumByStatus',
    checkAuthCode: '/Pc/PublicPc/checkAuthCode',
    mailShare:'/Api/User/mailShare'
}
