// pages/home/home.js
const  db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        current:1,  // 1 表示最美心愿(人气最高) hot   2 表示最新心愿 (时间排序)  time 
        page:1,   // 当前的页数 
        limit:10,  // 每页10条 
        total:0  , // 总条数

    },

    // 加载下一页的数据
    loadmore(){
        console.log("加载更新 - loadmore")
        this.setData({
            page:++this.data.page ,
        })
        if(this.data.page> Math.ceil(this.data.total/this.data.limit)){
            wx.showToast({
                title:'数据已经见底了',
                icon:"none"
            })
        }else{
            // 请求第二页数据  
            this.getDataList(true) 
            wx.showToast({
                title:'加载更多数据成功',
                icon:"none"
            })
        }
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
    // 修改current
    changeIndex(e){
        // console.log(e)
        this.setData({
            current:e.target.dataset.index,
            page:1   // 从第一页数据请求
        })

        // 重新请求数据 
        this.getDataList()
    },

    // 请求数据 
    // 排序   心愿  hot   降序
    //  时间 排序   
    getDataList(flag){
        // 每次请求数据最多20条 
        // 分页  
        
        wx.showLoading({
          title: '',
        })
        db.collection("wish_pools")
        // .orderBy("hot","desc")     // hot 降序 
        .orderBy(this.data.current==1?'hot':'time',"desc")     // time    降序 
        .skip((this.data.page-1) * this.data.limit )
        .limit(this.data.limit)   // 10条数据 
        .where({})
        .get()
        .then(res=>{
            console.log(res)
            wx.hideLoading({})
            var list = res.data.map((item)=>{
                item.time = this.timeFormat(item.time)   // 格式化的时间 
                return item 
            })

            // flag true 数据累加 
            // flag false 直接获取第一页数据 
            if(flag){
                this.data.list = this.data.list.concat(list);
                this.setData({
                    list:this.data.list 
                })
            }else{
                this.setData({
                    list:list
                })
            }
           
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection("wish_pools")
        .where({})
        .count()
        .then(res=>{
            console.log(res)
            this.setData({
                total:res.total  // 总条数 
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
        this.getDataList()
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