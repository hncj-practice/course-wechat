// pages/teacher-course/teacher-course.js
var util = require('../../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    courses: []
  },

  /**
   * 查询当前登录教师所教授的所有课程
   */
  getCourse() {
    var that = this;
    var url = "http://123.56.156.212/Interface/course/getcoursebytnoorcoursename";
    var data = {
      condition: app.globalData.loginuser.tno,
      type: 1
    }
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }
      console.log(res.data)
      that.setData({
        courses: res.data.data
      })
    })
  },

  /**
   * 从当前登录教师所教授的所有课程中筛选出需要的
   */
  searchcourse(){

  },

  /**
   * 跳转到课程页面
   */
  gotocourse() {
    wx.showToast({
      title: '跳转到课程页面',
      icon: 'none'
    })
    console.log("跳转到课程页面");
    wx.navigateTo({
      url: '../teacher-course/course-detail/course-detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  jumpToIndex() {
    console.log(util.getCurrentPage());
    if (util.getCurrentPage() === "pages/teacher/teacher-index/teacher-index") {
      return;
    }
    wx.redirectTo({
      url: '../teacher-index/teacher-index',
    })
  },

  jumpToMsg() {
    console.log(util.getCurrentPage());
    if (util.getCurrentPage() === "pages/teacher/teacher-msg/teacher-msg") {
      return;
    }
    wx.redirectTo({
      url: '../teacher-msg/teacher-msg',
    })
  },

  jumpToCourse() {
    if (util.getCurrentPage() === "pages/teacher/teacher-course/teacher-course") {
      return;
    }
    wx.redirectTo({
      url: '../teacher-course/teacher-course',
    })
  },

  jumpToMe() {
    if (util.getCurrentPage() === "pages/pages/teacher/teacher-me/teacher-me") {
      return;
    }
    wx.redirectTo({
      url: '../teacher-me/teacher-me',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCourse();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})