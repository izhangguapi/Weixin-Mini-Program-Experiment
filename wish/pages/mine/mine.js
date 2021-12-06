// pages/mine/mine.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
    },
    gotoshou(){
        wx.navigateTo({
            url: '../myshou/myshou',
        })
    },
    gotolike(){
        wx.navigateTo({
          url: '../mylike/mylike',
        })
    },
    // 退出登录
    logoutaction(){
        wx.showModal({
            title:"警告",
            content:"你真的要退出登录吗?",
            success:res=>{
                if(res.confirm){
                    // 点击了确定
                    this.setData({
                        userInfo:null
                    })
                    wx.setStorageSync('userInfo', null);
                }
            }
        })
    },

    // 授权登录  
    authLogin(){
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success:res=>{
                console.log(res)
                // 去数据库查询 
                // 如果有数据 不管 不需要再次插入
                // 没有数据 就要插入数据 
                // 要把数据存储在本地  wx.setStorageSync 
                var userInfo = res.userInfo;
                wx.showLoading({
                    title:"授权中..."
                })
                db.collection("wish_users")
                .where({
                    nickName:userInfo.nickName
                })
                .get()
                .then(res=>{
                    console.log(res)
                    wx.hideLoading();
                    wx.showToast({
                        title:"授权成功"
                    })
                    // 用户信息存储起来 
                    this.setData({
                        userInfo:userInfo 
                    })
                    wx.setStorageSync('userInfo', userInfo); // 用户信息存储在本地了 

                    if(res.data.length>0){
                        // 如果有数据 不管 不需要再次插入
                    }else{
                        // 插入数据 
                        userInfo.time = new Date();  // 记录授权注册时间
                        db.collection("wish_users")
                        .add({
                            data:userInfo  // 注册用户信息 
                        })
                        .then(res=>{

                        })
                    }
                })
            },
            fail:err=>{
                wx.showToast({title:"你取消了授权",icon:"none"})
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断是否已经授权 , 就直接使用缓存的本地数据
        if(wx.getStorageSync('userInfo')){
            this.setData({
                userInfo:wx.getStorageSync('userInfo')
            })
        }
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