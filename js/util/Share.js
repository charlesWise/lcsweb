/**
 * @module nxsd分享
 * @Share 自定义分享 页面授权 事件自定义
 * @author chenrunsheng
 */

'use strict';
import ServiceUrl from 'res/ServiceUrl';
import chttp from 'controller/chttp';

function doCfgWx(conf, params) {
  wx.config({
    debug: false,
    appId: conf.appId,
    timestamp: conf.timestamp,
    nonceStr: conf.nonceStr,
    signature: conf.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareQZone'
    ]
  });

  wx.ready(function () {
    var shareData = {
      title: params.share_title,
      desc: params.share_desc,
      link: params.share_url,
      imgUrl: params.share_img
    };

    wx.onMenuShareAppMessage(shareData);//监听"分享给朋友"
    wx.onMenuShareTimeline(shareData);//监听"分享到朋友圈"
    wx.onMenuShareQQ(shareData);//监听"分享到QQ"
    wx.onMenuShareQZone(shareData);//监听"分享到QQ空间"
  });
}

function getWxCfg(params){
  var url = encodeURIComponent(window.location.href.split('#')[0]);

  chttp.post(ServiceUrl.getJssdk,{url}).then((content) =>{
      if(content.boolen==1) {
        doCfgWx(content.data, params);
      }
  });
}

module.exports = {
  getWxCfg
}




