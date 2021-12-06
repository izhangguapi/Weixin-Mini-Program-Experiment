// pages/submit/submit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types:[
            "梦想",
            "学习",
            "工作",
            "感情",
            "健康",
            "其他"
        ],
        type:"",
        levels:[
            "简单",
            "适中",
            "困难"
        ],
        level:"",
        open:"1",
        title:"",
        desc:""
    },

    // 许愿
    startWish(){
        
        // 先判断是否登录  判断本地的userInfo
        var userInfo  =  wx.getStorageSync('userInfo')
        if(userInfo){
            if(this.data.title && this.data.desc && this.data.type &&this.data.level){
                // 提交数据 
                // add 数据库插入 
                wx.showLoading({
                    title:"许愿中"
                })
                wx.cloud.database()
                .collection("wish_pools")
                .add({
                    data:{
                        author:userInfo.nickName,  // 发布人
                        avatarUrl:userInfo.avatarUrl, 
                        title:this.data.title,
                        desc:this.data.desc,
                        type:this.data.type,
                        level:this.data.level,
                        open:this.data.open,
                        time:new Date(),
                        hot:this.data.open=="1"?10:5,  // 热度
                        like:0,   // 点赞
                        shou:0,   // 收藏
                        list:[]   // 评论数据 
                    }
                })
                .then(res=>{
                    wx.hideLoading({})
                    wx.showToast({
                        title:"许愿成功",
                        icon:"success"
                    })
                    this.setData({
                        title:'',
                        desc:'',
                        type:'',
                        level:'',
                        open:"1",
                    })
                })
            }else{
                wx.showToast({
                    title:"请完善数据",
                    icon:"error"
                })
            }
        }else{
            wx.showModal({
                title: '提示',
                content: '你还没有登录,不能许愿哦.',
                success :(res)=> {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.switchTab({
                      url: '../mine/mine',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
            })
        }
    },
    // 1 表示公开  0 表示匿名  
    radioChange(e){
        console.log(e)
        this.setData({
            open:e.detail.value   // bug 
        })
    },
    showLevels(){
        wx.showActionSheet({
            itemList: this.data.levels,
            success :(res)=> {
              console.log(res.tapIndex)
              this.setData({
                  level:this.data.levels[res.tapIndex]
              })
            },
            fail (res) {
              console.log(res.errMsg)
            }
          })
    },
    showList(){
        console.log("showList")
        wx.showActionSheet({
          itemList: this.data.types,
          success :(res)=> {
            console.log(res.tapIndex)
            this.setData({
                type:this.data.types[res.tapIndex]
            })
          },
          fail (res) {
            console.log(res.errMsg)
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