// pages/photo/photo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pic:"../../images/1.jpg",
        items:["扫码","拨打电话","开启定位"],
        latitude:'',
        longitude:""
    },
    // 打开微信的内置地图
    openwxmap(){
        wx.openLocation({
            latitude:this.data.latitude,
            longitude:this.data.longitude,
            scale: 18, // 缩放级别
            name:"武汉设计工程学院",
            address:"杨乔湖大道"
        })
    },
    // 打开动作列表框
    showmore(){
        wx.showActionSheet({
            itemList:this.data.items,
            success: (res)=> {
              console.log(res.tapIndex)
              var index = res.tapIndex;
              if(index==-0){
                // 扫码
                wx.scanCode({
                    success (res) {
                      console.log(res)
                    }
                })
              }else if(index==1){
                wx.makePhoneCall({
                    phoneNumber: '17671210081' //仅为示例，并非真实的电话号码
                })
              }else if(index==2){
                //   定位
                wx.getLocation({
                    type: 'wgs84',
                    success:(res)=> {
                        console.log(res);
                        const latitude = res.latitude
                        const longitude = res.longitude
                        const speed = res.speed
                        const accuracy = res.accuracy
                        this.setData({
                            latitude,
                            longitude
                        })
                    }
                   })
              }
            },
            fail (res) {
              console.log(res.errMsg)
            }
        })
    },
    // 手机拍照
    takephoto(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success :(res)=> {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFilePaths
              this.setData({
                pic:tempFilePaths
              })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
          // 使用 wx.createContext 获取绘图上下文 context
          var context = wx.createCanvasContext('firstCanvas')
          context.setStrokeStyle("#00ff00")
          context.setLineWidth(5)
          context.rect(0, 0, 200, 200)
          context.stroke()
          context.setStrokeStyle("#ff0000")
          context.setLineWidth(2)
          context.moveTo(160, 100)
          context.arc(100, 100, 60, 0, 2 * Math.PI, true)
          context.moveTo(140, 100)
          context.arc(100, 100, 40, 0, Math.PI, false)
          context.moveTo(85, 80)
          context.arc(80, 80, 5, 0, 2 * Math.PI, true)
          context.moveTo(125, 80)
          context.arc(120, 80, 5, 0, 2 * Math.PI, true)
          context.stroke()
          context.draw()
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