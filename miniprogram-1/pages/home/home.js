// pages/home/home.js
// Page() 注册小程序中的一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num:1000,
        iSrc:"../../images/6.jpg",
        flag:true, 
        arr:[
            "小王",
            "小刘",
            "小李",
            "小左"
        ],
        word:"hello - 2021"
    },
    changeWord(){
        this.setData({
            word:"周六 - happy"
        })
    },
    // 自定义函数 
    changeFlag(){
        this.setData({
            flag:!this.data.flag 
        })
    },
    // 绑定的函数 
    changeNum(){
        this.setData({
            num:++this.data.num 
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