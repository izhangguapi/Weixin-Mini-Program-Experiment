// pages/mine/mine.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        count:1023
    },

    changeCount(){
      this.setData({
        count:this.data.count+10
      })
    },
      
    // 进入todolist
    gototodolist(){
      wx.navigateTo({
        url: '../todolist/todolist',
      })
    },

    // 进入多媒体 
    gotophoto(){
        wx.navigateTo({
          url: '../photo/photo',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // // 云开发的增删改查
        // wx.showLoading({title:"加载中..."})
        // const db = wx.cloud.database();    // 指向的当前的数据库  
        // // 修改  作业 
        // // 小美  ===>   WIDS1234
        // // 删除
        // db.collection("WIDS_USER")
        // .where({
        //   username:"zuozuomu"
        // })
        // .remove()
        // .then(res=>{
        //   console.log(res)
        // })
        // // 添加
        // db.collection("WIDS_USER").add({
        //   data:{
        //     username:"小美",
        //     password:"123123"
        //   }
        // })
        // .then(res=>{
        //   console.log(res)
        // })
        // // 查询
        // db.collection("WIDS_USER")
        // .where({})
        // .get()
        // .then(res=>{
        //   console.log(res);
        //   wx.hideLoading();
        // })
        // db.collection("WIDS_EMPS")
        // .where({})
        // .get()
        // .then(res=>{
        //   console.log(res);
        //   wx.hideLoading();
        // })

        // // 修改 
        // db.collection("WIDS_EMPS")
        // .where({
        //   username:"小美",
        // })
        // .update({
        //   data:{
        //     password:"abc123000"
        //   }
        // })
        // .then(res=>{
        //   console.log(res)
        //   wx.showToast({
        //     title:"修改成功",
        //     icon:"none"
        //   })
        // })
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