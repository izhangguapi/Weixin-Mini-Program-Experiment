// pages/todolist/todolist.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        content:"",
        list:[]
    },
    // 点赞
    dianzanAction(e){
        var index = e.target.dataset.index 
        var item = e.target.dataset.item  // 表示当前你要修改的数据项 
        wx.showLoading({
            title:""
        })
        db.collection("WIDS_liuyan")
        .where({
            _id:item._id
        })
        .update({
            data:{
                like:db.command.inc(1)  // 每次点击 加 1         
            }
        })
        .then(res=>{
            wx.hideLoading({})
            wx.showToast({
                title:"点赞成功"
            })
            
            // 重新的请求数据库的数据 
            db.collection("WIDS_liuyan")
            .orderBy("_id","desc")
            .where({})
            .get()
            .then(res=>{
                this.setData({
                    list:res.data 
                })
            })
        })
    },
    // 修改留言
    updateOne(e){
        
        var index = e.target.dataset.index;
        var item = e.target.dataset.item;
        console.log(item)
        // wx.showToast({title:"okokok"})
        wx.showModal({
            title:item.title,
            content:item.content,  // bug content 
            placeholderText:"请输入",
            editable:true,
            success:res=>{
                // 点击了确定
                if(res.confirm){
                    console.log(res)
                    item.content = res.content ;  // x修改后的数据 
                    // 修改后台数据
                    wx.showLoading({
                      title: '',
                    })
                    db.collection("WIDS_liuyan")
                    .where({
                        _id:item._id
                    })
                    .update({
                        data:{
                            content:res.content
                        }
                    })
                    .then(res=>{
                        wx.hideLoading()
                        wx.showToast({title:"修改成功",icon:"none"})
                        // 前端修改 
                        this.data.list.splice(index,1,item);
                        this.setData({
                            list:this.data.list 
                        })
                    })


                }else{

                }
            }
        })
    },
    // 删除留言
    deleteOne(e){
        var index = e.target.dataset.index
        var item = e.target.dataset.item 
        console.log(index)
        console.log(item)
        // 传参数 
        wx.showModal({
            title:"提示",
            content:"你真的要删除吗",
            success:res=>{
                console.log(res)
                if(res.confirm){
                    // 表示点击了确定 就删除
                    wx.showLoading({})
                    db.collection("WIDS_liuyan")
                    .where({
                        _id:item._id
                    })
                    .remove()
                    .then(res=>{
                        wx.hideLoading()
                        wx.showToast({title:"删除成功"})
                        // 前端删除  splice(index,1)
                        this.data.list.splice(index,1)
                        this.setData({
                            list:this.data.list 
                        })
                    })
                }else{
                    // 不做处理 
                }
            }
        })
    },
    // 添加留言 
    addcomment(){
        // 判断数据是否为空  
        if(this.data.title && this.data.content){
            wx.showLoading({
                title:"提交中..."
            })
            // 插入数据库  
            db.collection("WIDS_liuyan")
            .add({
                data:{
                    title:this.data.title,
                    content:this.data.content
                }
            })
            .then(res=>{
                console.log(res)
                wx.hideLoading()
                wx.showToast({title:"提交成功"});
                this.setData({
                    title:"",
                    content:""
                })
                // 重新的请求数据库的数据 
                db.collection("WIDS_liuyan")
                .orderBy("_id","desc")
                .where({})
                .get()
                .then(res=>{
                    this.setData({
                        list:res.data 
                    })
                })
            })

        }else{
            wx.showToast({
                title:"提交的数据不能为空",
                icon:"none"
            })
        }
    },
    // 重置数据 
    resetData(){
        console.log("重置数据")
        this.setData({
            title:'',
            content:''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 增删改查  云开发 
        // get
        // remove
        // update
        // add 
        wx.showLoading({title:"请求中..."})
        db.collection("WIDS_liuyan")
        .orderBy("_id","desc")   // 排序  id 降序 最新的在最前面 
        .where({})
        .get()  
        .then(res=>{
            console.log(res)
            wx.hideLoading({})
            wx.showToast({title:"获取留言成功",icon:"none"})
            this.setData({
                list:res.data
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