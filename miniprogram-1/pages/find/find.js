// pages/find/find.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",   // 标题
        content:"",  // 内容
        list:[
            {
                title:"武设",
                content:"武汉设计工程学院"
            },
            {
                title:"周六",
                content:"美丽的周六从小程序开始..."
            }
        ]
    },
    // 修改留言 
    updateOne(e){
        var item = e.target.dataset.item;
        var index = e.target.dataset.index;
        console.log(item,index)
        wx.showModal({
            title:item.title,
            content:item.content,    // 默认只能修改 内容   
            editable:true,
            placeholderText:"请输入要修改的内容",
            success:res=>{
                console.log(res)
                if (res.confirm) {
                    console.log('用户点击确定')
                    this.data.list.splice(index,1,{title:item.title,content:res.content}); // 修改内容  ...item 展开运算
                    // splice(index,items,newItem)
                    this.setData({
                        list:this.data.list,
                    })
                    wx.showToast({  
                        title:'修改成功',
                        icon:"none"
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail:err=>{
                console.log(err)
            }       
        })
    },
    // 删除留言
    deleteOne(e){
       console.log(e);  
       var index = e.target.dataset.index   
       this.data.list.splice(index,1);   // splice(index,1) 删除元素 
       this.setData({     // 修改数据必须执行  setData 
           list:this.data.list  
       })
       wx.showToast({
           title:"删除成功",
           icon:'none'
       })
    },
    // 添加留言
    addToList(){
        console.log(this.data.title,this.data.content);
        if(this.data.title && this.data.content){
            // push 数组末尾添加元素
            // unshift  数组开头添加元素 

            this.data.list.unshift({
                title:this.data.title,
                content:this.data.content 
            })
            this.setData({
                list:this.data.list,
                title:"",
                content:""
            })
            wx.showToast({
                title:'添加成功',
                icon:"none"
            })
        }else{
            wx.showToast({
                title:"请输入内容或者标题",
                icon:"error"
            })
        }
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