// pages/teacher/teacher-course/course-detail/teacher-topic/teacher-topic.js
var util = require("../../../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  getTopicDetail(options) {
    var topicid = options.topicid;
    var title=options.title;
    var content=options.content;
    this.setData({
      title:title,
      content:content
    })
    var url = "https://fengyezhan.xyz/Interface/comment/getcommentbytopicid";
    var data = {
      topicid: topicid
    }
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopicDetail(options);
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