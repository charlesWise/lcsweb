'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';

export default class Help extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['常见问题','名词解读'],
            questionList:[
                {
                    q:'如何下载手机App?',
                    a:'苹果用户可以通过App Store 查找“长富云”下载；安卓可以通过各大应用商店下载。也可以进入长富云理财师官网扫码下载。'
                },
                {
                    q:'如何成为长富云平台认证理财师?',
                    a:'通过App完成注册，答题认证成为平台理财师。如第一次答题不通过可继续尝试，也可以通过App“我的”-“申请成为理财师”入口，继续答题完成平台认证，成为长富云理财师。'
                },
                {
                    q:'返佣比例是什么?',
                    a:'返佣比例即理财师佣金比例，是理财师通过长富云平台帮助客户购买产品后，所获得的由长富云提供的产品佣金。公式：理财师佣金=产品认购金额*返佣比例。'
                },
                {
                    q:'如何赚取佣金?',
                    a:'通过长富云App帮助客户完成产品预约，并且线下签署基金购买合同，认购款项打入募集账户，服务经理完成订单成交确认，就可以获得该产品给予理财师的佣金。'
                },
                {
                    q:'如何预约，购买产品?',
                    a:'通过长富云App产品中心详情页面，完成产品预约，服务经理会在3小时内联系您，线下确定购买事项。'
                },
                {
                    q:'如何更详细了解产品?',
                    a:'选择产品，点击“资料下载”，就能下载到该产品所有的资料，也可以联系您的专属服务经理获取产品详细资料。'
                },
                {
                    q:'产品只要有额度都可以预约吗?',
                    a:'产品列表中可以查看到此产品剩余额度，同时如果是固定收益类产品请认真查看是否有大小额限制。'
                },
                {
                    q:'理财师佣金是税前还是税后?',
                    a:'个人理财师登录后查看到的是税后的顾问费率。'
                },
                {
                    q:'理财师佣金什么时候发?',
                    a:'您所投资的基金产品成立后次日发放到您的账户中，在APP账户余额中可提现。'
                },
                {
                    q:'为什么要绑定银行卡?',
                    a:'我们会将理财师佣金直接打入您的APP账户中，需要您绑定银行卡提现。'
                }
            ],
            unscrambleList:[
                {
                    q:'什么是信托？',
                    a:'固定收益类信托产品是指由信托公司发行的，收益率和期限固定的信托产品。融资方通过信托公司向投资者募集资金，并通过将资产（股权）抵押（质押）给信托公司、以及第三方担保等措施，保证到期归还本金及收益。，需要您绑定银行卡提现。'
                },
                {
                    q:'信托和资管的区别？',
                    a:'发行机构不同：资管是基金子公司发行的，信托是信托公司发行的。<br/>监管部门不同：基金子公司由证监会监管，信托公司由银监会监管。<br/>投资者数量限制不同：单个资产管理计划的委托人不得超过200人，但单笔委托金额在300万元人民币以上的投资者数量不受限制，而每个信托产品自然人投资者人数不超过50个，但300万以上的自然人和投资者和机构投资者数量不受限制。<br/>注册资本金有差别：这点其实也没有硬性规定，但实际中，信托公司的注册资本一般是10亿级别，而基金子公司是几千万的级别。'
                },
                {
                    q:'PE/VC是什么？',
                    a:'PE投资即Private Equity，股权投资，即“私募股权投资”，是指投资于非上市股权，或者上市公司非公开交易股权的一种投资方式。私募股权投资的资金来源，面向有风险辨识能力的自然人或承受能力的机构投资者以非公开发行方式，来募集资金。<br/>VC风险投资（Venture Capital），主要是指向初创企业提供资金支持并取得该公司股份的一种融资方式，VC投早期的项目，项目初具规模，但是商业模式可能还不成熟，一般投资额也不大。'
                },
                {
                    q:'私募基金与公募基金？',
                    a:'私募基金（Private Fund）是私下或直接向特定群体募集的资金。与之对应的公募基金（Public Fund）是向社会大众公开募集的资金。<br/>公募基金（Public Offering of Fund），公募基金是受政府主管部门监管的，向不特定投资者公开发行受益凭证的证券投资基金，这些基金在法律的严格监管下，有着信息披露，利润分配，运行限制等行业规范。'
                },
                {
                    q:'FOF基金？',
                    a:'FOF（Fund of Fund）是把公募、私募或其他基金产品作为投资标的的基金策略，被投资的标的称为子基金，投资方称为母基金。FOF并不直接投资股票或债券，其投资范围仅限于其他基金，通过持有其他证券投资基金而间接持有股票、债券等证券资产，它是结合基金产品创新和销售渠道创新的基金新品种。'
                },
                {
                    q:'量化对冲？',
                    a:'量化对冲是“量化”和“对冲”两个概念的结合。“量化”理论上说就是通过借助统计学、数学方法分析历史数据比如价格、交易量、各种大事件等，其本质是定性投资的数量化实践。“对冲”指通过管理并降低组合系统风险以应对金融市场变化，获取相对稳定的收益。实际中对冲基金往往采用量化投资方法，两者经常交替使用，但量化基金不完全等同于对冲基金。'
                },
                {
                    q:'红筹股回归',
                    a:'红筹股（Red Chip），这一概念诞生于90年代初期的香港股票市场。中华人民共和国在国际上有时被称为红色中国，相应地，香港和国际投资者把在境外注册、在香港上市的那些带有中国大陆概念的股票称为红筹股。'
                },
                {
                    q:'管理期货',
                    a:'管理期货是对冲基金中一种只投资于期货市场的投资策略，其中专业投资组合经理被称为商品交易顾问（商品交易顾问），他们将期货合约作为其整体投资策略的一部分。管理期货在各类投资风格和资产类别中，投资组合是多样化的，从而可有效缓解直接股权投资组合的风险。这些交易顾问作为投资媒介，通常会在全球期货和期权市场自由裁量基础上管理客户资产。这些商品交易顾问可能会直接为客户提供商品基金。'
                },
                {
                    q:'什么是大小配比？',
                    a:'单个信托计划的300万以下自然人投资者人数不超过50个，所以根据信托的规模不同会对购买金额加以限制，区分大额购买人和小额购买人；严格配比：大额配比和小额配比是按一定比例分配的；已配出小额：规定了小额购买人的数量；全大额：所有购买人为均为大额购买人；小额畅打：小额购买者没有人数限制。'
                },
                {
                    q:'证券基金的封闭期？',
                    a:'所谓开放式基金的封闭期是指基金成功募集足够资金宣告基金合同生效后，会有一段不接受投资人赎回基金份额申请的时间段。设定封闭期一方面是为了方便基金的后台（登记注册中心）为日后申购、赎回做好最充分的准备；另一方面基金管理人可将募集来的资金根据证券市场状况完成初步的投资安排。根据《证券投资基金运作管理办法》规定，基金封闭期不得超过3个月。'
                },
                {
                    q:'付息方式',
                    a:'付息方式分按季付息、半年付息、按年付息、到期付息。'
                },
                {
                    q:'质/抵押率',
                    a:'抵押率，也叫垫头，具体是指抵押贷款本息之和所占抵押物评估价值的比值。<br/>质押率，质押率为贷款本金与标准仓单市值的比率。'
                },
            ],
        }
    }
    selected(index) {
        this.setState({
            curIndex: index
        })
    }
    showAnswer(index,type){
        if(type=='unscramble'){
            let ele = document.getElementsByClassName('unscrambleList')[index];
            let iconEle = document.getElementsByClassName('unscramble_arrow')[index];
            if(ele.className.includes('dn')){
                ele.className='unscrambleList';
                iconEle.src = './images/aboutUs/down.png';
            }else{
                ele.className='unscrambleList dn';
                iconEle.src = './images/aboutUs/up.png';
            }
        }else{
            let ele = document.getElementsByClassName('answerList')[index];
            let iconEle = document.getElementsByClassName('answer_arrow')[index];
            if(ele.className.includes('dn')){
                ele.className='answerList';
                iconEle.src = './images/aboutUs/down.png';
            }else{
                ele.className='answerList dn';
                iconEle.src = './images/aboutUs/up.png';
            }
        }
    }
    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} selected={this.selected.bind(this)}/>
            {
                this.state.curIndex==0?<div className="about_content">
                    <ul className="question_list">
                        {
                            this.state.questionList && this.state.questionList.map(function(item,index){
                                return <li key={index}>
                                    <p>
                                        <i className="icon" style={{border:'1px #508cee solid',color:'#508cee'}}>Q</i>
                                        <span onClick={this.showAnswer.bind(this,index,'question')} style={{cursor:'pointer'}}>{item.q}?</span>
                                        <img src='./images/aboutUs/up.png' alt="" key={this.state.curIndex} className="arrow answer_arrow"/>
                                    </p>
                                    <p className='answerList dn'>
                                        <i className="icon" style={{border: "1px #ff801a solid",color:'#ff801a'}}>A</i>
                                        <span>{item.a}</span>
                                    </p>
                                </li>
                            }.bind(this))
                        }
                    </ul>
                </div>:
                this.state.curIndex==1?<div className="about_content">
                    <ul className="question_list">
                        {
                            this.state.unscrambleList && this.state.unscrambleList.map(function(item,index){
                                return <li key={index}>
                                    <p>
                                        <i className="icon" style={{border:"1px #508cee solid",color:'#508cee'}}>Q</i>
                                        <span onClick={this.showAnswer.bind(this,index,'unscramble')} style={{cursor:'pointer'}}>{item.q}</span>
                                        <img src='./images/aboutUs/up.png' alt="" className="arrow unscramble_arrow"/>
                                    </p>
                                    <p className='unscrambleList dn'>
                                        <i className="icon" style={{border:"1px #ff801a solid",color:'#ff801a'}}>A</i>
                                        <span  dangerouslySetInnerHTML={{__html:item.a}}></span>
                                    </p>
                                </li>
                            }.bind(this))
                        }
                    </ul>
                </div>:''
            }
        </div>
    }
}
