'use strict'
var React = require('react');
import Mlux from 'mlux';
import ServiceUrl from 'res/ServiceUrl';
import chttp from 'controller/chttp';

module.exports = class Share extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            dataInfo:{},
            wxAccessToken:''
        }
    }
    share(obj){
        //console.log(obj)
        //let that = this;
        //mobShare.config({
        //    debug: false, // 开启调试，将在浏览器的控制台输出调试信息
        //    appkey: '1d91ba74ef3c0', // appkey
        //    params: {
        //        url: '/#center', // 分享链接
        //        title: '侬享时代', // 分享标题
        //        description: '侬享时代123', // 分享内容
        //        pic: 'http://img2.imgtn.bdimg.com/it/u=874633076,2462333724&fm=26&gp=0.jpg', // 分享图片，使用逗号,隔开
        //        reason: '',//自定义评论内容，只应用与QQ,QZone与朋友网
        //    },
        //    callback: function (plat, params) {
        //        console.log('success!')
        //        that.props.close && that.props.close();
        //        if(obj && obj.type=='village'){
        //            if(obj && obj.isLogin) {
        //                chttp.post(ServiceUrl.addVillageShare, {village_id: obj && obj.village_id}).then((content)=> {
        //                    if (content.boolen == 1) {
        //                        console.log(content.data)
        //                    }
        //                })
        //            }
        //        }
        //    }
        //});
    }

    //wxShare(){
    //    wx.config({
    //        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //        appId: 'wx9edf1e1729a7da17', // 必填，公众号的唯一标识
    //        timestamp:this.state.dataInfo && this.state.dataInfo.timestamp , // 必填，生成签名的时间戳
    //        nonceStr:this.state.dataInfo && this.state.dataInfo.nonceStr , // 必填，生成签名的随机串
    //        signature: this.state.dataInfo && this.state.dataInfo.signature,// 必填，签名，见附录1
    //        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //    });
    //
    //    wx.onMenuShareAppMessage({
    //        title: 'nxsd', // 分享标题
    //        desc: '侬享时代111', // 分享描述
    //        link: 'http://uatwap.nxshidai.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //        imgUrl: 'http://img.doooor.com/img/forum/201406/23/232524vidimyvwlodls8oi.png', // 分享图标
    //        type: '', // 分享类型,music、video或link，不填默认为link
    //        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //        success: function () {
    //            // 用户确认分享后执行的回调函数
    //            alert('success')
    //        },
    //        cancel: function () {
    //            alert('failed')
    //            // 用户取消分享后执行的回调函数
    //        }
    //    });
    //
    //    wx.onMenuShareTimeline({
    //        title: 'nxsd', // 分享标题
    //        desc: '侬享时代222', // 分享描述
    //        link: 'http://uatwap.nxshidai.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //        imgUrl: 'http://img.doooor.com/img/forum/201406/23/232524vidimyvwlodls8oi.png', // 分享图标
    //        type: '', // 分享类型,music、video或link，不填默认为link
    //        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //        success: function () {
    //            // 用户确认分享后执行的回调函数
    //            alert('success')
    //        },
    //        cancel: function () {
    //            alert('failed')
    //            // 用户取消分享后执行的回调函数
    //        }
    //    });
    //}

    ready(){
        //if(!document.getElementById('wx')){
        //    let script = document.createElement("script");
        //    script.id = 'wx';
        //    script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
        //    document.body.appendChild(script);
        //}
        //let url = location.href.split('#')[0];
        //chttp.post(ServiceUrl.getJssdk,{url:url}).then((content)=> {
        //    if (content.boolen == 1) {
        //        this.setState({
        //            dataInfo:content.data
        //        })
        //    }
        //});
    }

    componentDidMount(){
        this.ready();

        let imgUrl = 'http://www.baidu.com/images/share.jpg';  // 分享后展示的一张图片
        let lineLink = 'http://www.baidu.com'; // 点击分享后跳转的页面地址
        let descContent = "侬享时代！";  // 分享后的描述信息
        let shareTitle = '侬享时代';  // 分享后的标题
        let appid = 'wx9edf1e1729a7da17';  // 应用id,如果有可以填，没有就留空
        function shareFriend() {
            console.log(WeixinJSBridge.invoke),
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
            })
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
        }, false);
    }

    render(){
        //return <div className="-mob-share-ui -mob-share-ui-theme-slide-bottom" style={{display: this.props.closeShare?"none":'block'}}>
        //                <ul className="-mob-share-list">
        //                    <li className="-mob-share-qq" id="share_qq"><p>QQ</p></li>
        //                    <li className="-mob-share-qzone" id="share_qzone"><p>空间</p></li>
        //                    <li className="-mob-share-weibo" id="share_weibo"><p>新浪微博</p></li>
        //                    <li className="-mob-share-douban" id="share_douban"><p>豆瓣</p></li>
        //                </ul>
        //</div>
        return null
    }
}
