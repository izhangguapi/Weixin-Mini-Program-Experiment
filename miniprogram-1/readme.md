#  小程序  

# 小程序 页面 page  (wxml wxss js json)

#  wxml 指的小程序的单独的某个页面  (view  text  标签 )

#  page 指的小程序页面

#  utils 指的是小程序里面公共的文件

#  app.js  小程序启动的主文件  

#  app.json 小程序全局配置文件

#  app.wxss  小程序全局的样式 CSS  (弹性盒子)

#  project.config.json 微信开发者工具的配置文件 

#  sitemap.json 配置文件 

#  model:value="{{word}}"  简单的数据双向绑定 




#  练习 div + css 

#  练习  javascript  小程序的语法  

#  小程序的数据绑定  {{ }}   双大括号语法 

#  修改数据 使用  this.setData

# wx:if   控制显示隐藏 

# wx:for  循环数据   wx:for="{{list}}"  默认有2个变量   item表示当前的这一条数据   index  表示的当前这条数据的索引下标 

#  bindtap="changeFlag"  给这个标签绑定一个函数  函数为  changeFlag

# 小程序的API  wx.chooseImage   

# entryPagePath  小程序打开的第一个页面 

# app.json 全局的配置  pages window 

# home.json 页面配置  主要是设置 标题 导航  字体颜色 
# page.js  home.js  demo.js  (onLoad  onReady onShow onHide onUnload)
#  bindtap =  changeSome 
#  this.setData
#  简单的留言板 (修改完成 )
#  wx:for   循环数据
#  wx:if    控制显示和隐藏 
#  model:value  输入框的数据的双向绑定 
#  if{} else{}   条件判断  
#  数组的操作  push  pop  unshift  shift   数组添加数据 或者删除 数据  
# 小程序绑定的事件不能传递参数  data-  来传递参数  


# 全局配置  app.json 
# 局部配置  page.json 
# page 四个文件组成  (json  wxml  js  wxss )
# app.js  小程序全局的启动文件
# app.wxss  全局的样式


#  wx.request 发起请求  
#  common.wxss   小程序项目的公共样式

# 非法的域名  (1. 详情 - 本地设置  - 不校验合法域名 勾选   )   (2. 配置合法域名  )

# 本地存储  storage  wx.setStorageSync  wx.getStorageSync 



# 学习总结 
# 数据绑定 属性绑定  {{ }}
# 事件绑定 bindtap
# 变量定义在  page =>  data
# 修改数据  this.setData
# wx:if  wx:else 显示和隐藏
# wx:for  循环对象或者数组 

# 组件 (view  text  process video audio swiper input button switch radio map image ) 

# API (16) 
# wx.showToast wx.showModal wx.showActionsheet  wx.showLoading wx.hideLoading 
# wx.setStorageSync wx.getStorageSync wx.chooseImage wx.chooseVideo wx.getNetworkType 
# wx.navigateTo   wx.switchTab   wx.request  wx.scanCode wx.callPhone wx.getLocation 
# wx.openLocation  


# "navigationBarTitleText": "留言板"  修改页面的标题 

