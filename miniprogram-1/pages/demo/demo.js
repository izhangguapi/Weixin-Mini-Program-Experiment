// pages/demo/demo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:"hello world",
        count:925,
        word:"daydayup-天道酬勤 ",
        src:"../../images/5.jpg",
        flag:true ,  // true  条件为真  false 条件为假  
        list:[
            {
                title:"Vue",
                content:"Vue is so easy",
                img:"../../images/1.jpg"
            },
            {
                title:"React",
                content:"React很好玩",
                img:"../../images/2.jpg"
            },
            {
                title:"小程序",
                content:"小程序你在认真听了吗...",
                img:"../../images/3.jpg"
            },
            {
                title:"JavaScript",
                content:"html5 你指的认真去学习...",
                img:"../../images/4.jpg"
            }
        ]
    },
    changeFlag(){
        this.setData({
            flag:!this.data.flag 
        })
    },
    changeCount(){
        console.log('test - 测试')
        this.setData({
            count:++this.data.count   // bug  
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