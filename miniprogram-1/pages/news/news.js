// pages/news/news.js
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:"金秋10月,收获的季节",
        count:1000,
        flag:false,
        films:[],
        cities:[],
        poster:"../../images/1.jpg",
        name:"七里香",
        author:"周杰伦",
        src:"http://47.104.209.44/mp/Sugar.mp3",
        vSrc:"http://47.104.209.44/mp/brkw1.mp4",
        danmuList:[{
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1
        }, {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }],
        text:"666"
    },
    // 警告弹框 
    showDanger(){
      this.video.pause();
      wx.showModal({
        title: '流量警告',
        content: '你正在使用网络流量观看视频,请确认!',
        cancelText:"取消观看",
        cancelColor:"#000000",
        confirmText:"继续观看",
        confirmColor:"#ff5500",
        success: (res)=> {
          if (res.confirm) {
            console.log('用户点击确定')
            this.video.play();
            wx.setStorageSync('isplay', true);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 监听视频播放
    videoplay(){
      console.log("监听视频播放")
      if(!wx.getStorageSync('isplay')){
        // 暂停播放  弹窗警告一下 
        this.showDanger()
      }
    },
    // 更新视频路径 
    changeVsrc(){
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,  
        camera: ['front', 'back'],
        success:res=>{
          this.setData({
            vSrc: res.tempFilePath  
          })
        }
      })
    },
    // 发送弹幕  
    sendDanmu(){
        this.video.sendDanmu({
          text:this.data.text,
          color:getRandomColor()
        })
    },
    // 播放音乐
    audioPlay(){  
      this.audioCtx.play();
    },
    // 暂停音乐
    audioPause(){
      this.audioCtx.pause();
    },
    // 请求城市列表 
    getcitylist(){
        wx.showLoading({
          title: '请求中',
        })
        wx.request({
          url: 'https://m.maizuo.com/gateway',
          data:{
            k: 11875
          },
          method:"GET",
          header:{
            'X-Host': 'mall.film-ticket.city.list'
          },
          success:res=>{
              console.log(res);
              this.setData({
                  cities:res.data.data.cities
              })
              wx.hideLoading();
              wx.showToast({
                  title:"请求成功",
                  icon:"none"
              })
          }
        })
    },
    getnewmsg(e){
        console.log(e)
        var value = e.detail.value  // 输入框的值  
        this.setData({
            msg:value 
        })
    },
    changecount(){
        this.setData({
            count:++this.data.count 
        })
    },
    // 自定义函数 
    loadactionendd(){
        console.log("加载完毕")
        this.setData({
            flag:true
        })
        wx.showToast({
          title: '请求成功',
          icon:'none'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({    // 请求接口的方法  
          url: 'https://m.maizuo.com/gateway',   // 接口地址
          data:{    // 接口参数
            cityId: 110100,
            pageNum: 1,
            pageSize: 10,
            type: 1,
            k: 8778236,
          },
          method:"GET",  // 请求接口的方式
          header:{    // 请求头  
            'X-Host': 'mall.film-ticket.film.list'
          },
          success:res=>{  //  接口请求成功的回调  
              console.log(res);
              this.setData({
                  films:res.data.data.films
              })
          }
        })  
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')   // 控制音频对象了  
        this.video = wx.createVideoContext('myVideo')    // 视频对象  
        // 获取网络状态
        wx.getNetworkType({
          success (res) {
            const networkType = res.networkType
            console.log(networkType);
            // 存储本地的数据  (storage 本地存储 )
            wx.setStorageSync("isplay",networkType=='wifi');   //true 可以播放 wifi    false 不可以播放  4g 3g  
          }
        })
        // 监听网络状态的改变  
        wx.onNetworkStatusChange(function (res) {
          wx.setStorageSync("isplay",res.networkType=='wifi');  
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})