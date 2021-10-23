// app.js
// app.js  小程序启动的主文件  
// App()  注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等
App({
  onLaunch() {  
    
    console.log("小程序启动了...")
     // 云开发初始化     
     if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'nz1903-ozmt0',     // 换成自己的 环境ID
        // traceUser: true,
      })
    }


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow(){

  },
  onHide(){
    
  },
  globalData: {
    userInfo: null
  }
})
