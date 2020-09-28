// pages/teacher/teacher-course/course-detail/teacher-topic/teacher-topic.js
var util = require("../../../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  initdata(options){
    var topicid = options.topicid;
    var title=options.title;
    var content=options.content;
    var time=options.time;
    time=util.formatTime(time,1);
    this.setData({
      title:title,
      content:content,
      topicid:topicid,
      time:time
    })
  },
  
  getComment() {
    var topicid = this.data.topicid;
    var url = "https://fengyezhan.xyz/Interface/comment/getcommentbytopicid";
    var data = {
      topicid: topicid
    }
    util.myAjaxPost(url, data).then(res => {
      // wx.showToast({
      //   title: res.data.message,
      //   icon: 'none'
      // })
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        return;
      }
      var data=res.data.data;
      var len=data.length;
      //格式化时间
      for(var i=0;i<len;i++){
        console.log(data[i].commenttime)
        data[i].time=util.formatTime(data[i].commenttime,1);
      }

      this.setData({
        comments: data
      })
    })
  },

  //实现图片预览
  previewImg(event) {
    var img = event.currentTarget.dataset.imagepath;
    var imgs = [img, ]
    wx.previewImage({
      current: img,
      urls: imgs,
    })
  },
  //获取评论内容
  getCommentValue(event){
    var content=event.detail.value;
    if(content){
      this.setData({
        commentcontent:content
      })
    }
  },

  //发送评论
  sendComment(event){
    var that=this;
    var content=that.data.commentcontent;
    console.log(content);

    var time=new Date().getTime();

    var url="https://fengyezhan.xyz/Interface/comment/addcomment";
    var data={
      sno:'081417154',
      topicid:that.data.topicid,
      commentcontent:content,
      commenttime:time
    }
    util.myAjaxPost(url,data).then(res=>{
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }
      //清空输入框
      that.setData({
        commentcontent:''
      })
      //更新数据
      that.getComment();
    })

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initdata(options);
    this.getComment();
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
    //显示顶部刷新图标
    wx.showNavigationBarLoading();

    this.getComment();

    //隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    //停止下拉事件
    wx.stopPullDownRefresh();
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