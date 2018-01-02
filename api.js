const api = {}
api.share = async(shareLink) => {
  var nowUrl = location.href.split('#')[0]; //获取当前完整URL，不包括#号后面的
  var {
    data
  } = await util.ajax({
    url: "",
    type: "post",
    data: {
      url: nowUrl
    }
  })
  //获取config信息
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.sign.appid, // 必填，公众号的唯一标识
    timestamp: data.sign.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.sign.nonceStr, // 必填，生成签名的随机串
    signature: data.sign.signature, // 必填，签名，见附录1
    jsApiList: [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      "onMenuShareQZone"
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  // console.log(JSON.stringify(data))
  wx.ready(function () {
    var imgUrl = '';//图标
    //分享朋友圈
    wx.onMenuShareTimeline({
        title: '标题', // 分享标题
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
      }),
      //分享朋友
      wx.onMenuShareAppMessage({
        title: '标题',
        desc: '描述',
        imgUrl: imgUrl,
        link: shareLink,
        success: function (res) {
          alert('分享成功！');
        },
        cancel: function (res) {
          alert('分享是一种美德哦！');
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
    //分享QQ
    wx.onMenuShareQQ({
      title: '标题', // 分享标题
      desc: '描述', // 分享描述
      link: shareLink, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功！');
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        alert('分享是一种美德哦！');
      }
    });
    //分享QQ空间
    wx.onMenuShareQZone({
      title: '标题', // 分享标题
      desc: '描述', // 分享描述
      link: shareLink, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        alert('分享成功！');
      },
      cancel: function () {
        alert('分享是一种美德哦！');
      },
    });
  })
}
export default api
