// pages/teacher-me/teacher-me.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: "https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/index.jpg"
  },

  /**
   * 跳转到课程页面
   */
  jump2Course(event){
    var status=event.currentTarget.dataset.status;
    console.log("WWW"+status);
    wx.navigateTo({
      url: '../teacher-course/teacher-course?status='+status,
    })
  },
  /**
   * 跳转到我的资料页面
   */
  jumpToMydata(){
    wx.navigateTo({
      url: './teacher-data/teacher-data',
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
  onLoad: function (options) {
    console.log(app.globalData.courses)
    this.setData({
      teachername: app.globalData.loginuser.name,
      teacheravatar: app.globalData.loginuser.avatar,
      courses:{
        allcourses:app.globalData.courses.allcourses,
        processing:app.globalData.courses.processing,
        processingnum:app.globalData.courses.processingnum,
        review:app.globalData.courses.review,
        reviewnum:app.globalData.courses.reviewnum,
        archive:app.globalData.courses.archive,
        archivenum:app.globalData.courses.archivenum
      }
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