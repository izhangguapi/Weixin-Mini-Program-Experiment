// pages/xinyuan/xinyuan.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        obj:{},
        _id:"",
        xlist:[] , // 当前心愿的评论
    },

    // 点击添加评论
    addPingLun(){
        var userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
            wx.showModal({
                title: '谢谢评论',
                placeholderText:"请输入你的评论哦",
                content: '',
                editable:true,
                success :(res)=> {
                  if (res.confirm) {
                    console.log(res)
                    // 添加评论  
                    // who
                    // _id
                    // content 
                    wx.showLoading({
                      title: '',
                    })
                    db.collection("wish_comments")
                    .add({
                        data:{
                            id:this.data._id,
                            nickName:userInfo.nickName,
                            avatarUrl:userInfo.avatarUrl,
                            time:new Date(),
                            content:res.content
                        }
                    })
                    .then(res=>{
                        wx.hideLoading();
                        wx.showToast({
                            title:"评论成功",
                            icon:'none'
                        })
                         // 请求当前心愿的评论
                        db.collection("wish_comments")
                        .where({
                            id:this.data._id
                        })
                        .get()
                        .then(res=>{
                            var xlist = res.data.map(item=>{
                                item.time = this.timeFormat(item.time)   // 格式化的时间 
                                return item 
                            })
                            this.setData({
                                xlist:res.data
                            })
                        })
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
            })
        }else{
            this.showModal()
        }
    },

    // 收藏心愿  每次加3 
    shoucangaction(){
        //  谁点赞 nickName   点赞了哪个心愿  _id 
        var userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
            // 先判断是否已经收藏了
            wx.showLoading({
              title: '',
            })
            db.collection("wish_collect")
            .where({
                _id:this.data._id,
                nickName:userInfo.nickName
            })
            .get()
            .then(res=>{
                wx.hideLoading({})
                if(res.data.length>0){
                    // 已经有这个心愿的收藏记录  
                    // 不能收藏
                    wx.showToast({
                        title:"你已经收藏了",
                        icon:"none"
                    })
                }else{
                    // 修改hot 每次收藏热度 + 3 
                    // 收藏表添加一条记录 
                    db.collection("wish_pools")
                    .where({
                        _id:this.data._id
                    })
                    .update({
                        data:{
                            hot:db.command.inc(3),
                            shou:db.command.inc(1),  
                        }
                    })
                    .then(res=>{
                        wx.showToast({
                            title:"收藏成功",
                            icon:"none"
                        })
                        // 重新请求数据 
                        db.collection("wish_pools")
                        .where({
                            _id:this.data._id
                        })
                        .get()
                        .then(res=>{
                            var obj = res.data[0]
                            obj.time = this.timeFormat(obj.time)  // 时间格式化
                            this.setData({
                                obj:obj,
                            })
                        })

                        db.collection("wish_collect")
                        .add({
                            data:{
                                nickName:userInfo.nickName,
                                _id:this.data._id, 
                                obj:this.data.obj 
                            }
                        })
                        .then(res=>{})
                    })
                }
            })
        }else{
            this.showModal()
        }
    },

    // 点赞   新建一张表   每个用户只能点赞一次 
    dianzanAction(){
        //  谁点赞 nickName   点赞了哪个心愿  _id 
        var userInfo = wx.getStorageSync('userInfo')
        if(userInfo){
            // 先判断是否已经点赞了
            wx.showLoading({
              title: '',
            })
            db.collection("wish_like")
            .where({
                _id:this.data._id,
                nickName:userInfo.nickName
            })
            .get()
            .then(res=>{
                wx.hideLoading({})
                if(res.data.length>0){
                    // 已经有这个心愿的点赞记录  
                    // 不能点赞
                    wx.showToast({
                        title:"你已经点赞了",
                        icon:"none"
                    })
                }else{
                    // 修改hot 每次点赞热度 + 2 
                    // 点赞表添加一条记录 
                    db.collection("wish_pools")
                    .where({
                        _id:this.data._id
                    })
                    .update({
                        data:{
                            hot:db.command.inc(2),
                            like:db.command.inc(1),  
                        }
                    })
                    .then(res=>{
                        wx.showToast({
                            title:"点赞成功",
                            icon:"none"
                        })
                        // 重新请求数据 
                        db.collection("wish_pools")
                        .where({
                            _id:this.data._id
                        })
                        .get()
                        .then(res=>{
                            var obj = res.data[0]
                            obj.time = this.timeFormat(obj.time)  // 时间格式化
                            this.setData({
                                obj:obj,
                            })
                        })

                        db.collection("wish_like")
                        .add({
                            data:{
                                nickName:userInfo.nickName,
                                _id:this.data._id, 
                                obj:this.data.obj 
                            }
                        })
                        .then(res=>{

                        })
                    })
                }
            })
        }else{
            this.showModal()
        }
    },
    showModal(){
        wx.showModal({
            title: '提示',
            content: '你还没有登录,请先登录',
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
    },

     // 时间格式化函数 
     timeFormat(date){
        var time = new Date(date)
        var year = time.getFullYear()
        var month = time.getMonth() + 1;
        var day = time.getDate()
        var hour = time.getHours()
        var min = time.getMinutes()
        var sec = time.getSeconds()
        return `${month}-${day} ${hour}:${min}:${sec}`
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var _id = options._id;
        wx.showLoading({
          title: '请求中',
        })
        // 每次进来热度都要加1 
        db.collection("wish_pools")
        .where({
            _id
        })
        .update({
           data:{
               hot:db.command.inc(1)
           }
        })
        .then(res=>{
            db.collection("wish_pools")
            .where({
                _id:_id
            })
            .get()
            .then(res=>{
                console.log(res)
                wx.hideLoading()
                wx.showToast({title:"请求成功",icon:"none"})
                var obj = res.data[0]
                obj.time = this.timeFormat(obj.time)  // 时间格式化
                this.setData({
                    obj:obj,
                    _id:_id 
                })
                wx.setNavigationBarTitle({
                title: res.data[0].title,
                })
            })
        })

        // 请求当前心愿的评论
        db.collection("wish_comments")
        .where({
            id:_id 
        })
        .get()
        .then(res=>{
            console.log(res)
            var xlist = res.data.map(item=>{
                item.time = this.timeFormat(item.time)   // 格式化的时间 
                return item 
            })
            this.setData({
                xlist:xlist
            })
        })
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