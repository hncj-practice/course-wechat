// pages/student/student-course/student-course.js

var PageJumpUtil = require('../../../utils/PageJumpUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //跳转到课程页面
  gotocourse(event) {
    var courseid = event.currentTarget.dataset.courseid;
    wx.showToast({
      title: '跳转到课程页面',
      icon: 'none'
    })
    console.log("跳转到课程页面");
    wx.navigateTo({
      url: './course-detail/course-detail?courseid=' + courseid
    })
  },
  // tabbar跳转
  jump(e) {
    let page = e.currentTarget.dataset.page;
    PageJumpUtil.jump(false, page);
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