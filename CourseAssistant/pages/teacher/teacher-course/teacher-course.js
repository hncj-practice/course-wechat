// pages/teacher-course/teacher-course.js
var util = require('../../../utils/util.js');
var PageJumpUtil = require('../../../utils/PageJumpUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    courses: []
  },

  // tabbar跳转
  jump(e) {
    let page = e.currentTarget.dataset.page;
    PageJumpUtil.jump(true, page);
  },

  /**
   * 从当前登录教师所教授的所有课程中筛选出需要的
   */
  searchcourse() {

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
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status;
    var courses = [];
    console.log("status:" + status);
    if (app.globalData.courses) {
      if (!status) {
        console.log("222");
        courses = app.globalData.courses.allcourses;
      } else if (status == "1") {
        courses = app.globalData.courses.processing;
      } else if (status == "2") {
        courses = app.globalData.courses.review;
      } else if (status == "3") {
        courses = app.globalData.courses.archive;
      }
    } else {
      courses = []
    }

    this.setData({
      courses: courses,
    })

    // this.getCourse();


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