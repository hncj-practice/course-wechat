// pages/teacher-me/teacher-me.js
var util = require('../../../utils/util.js');
var PageJumpUtil = require('../../../utils/PageJumpUtil.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: "https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/index.jpg"
  },
  //实现图片预览
  previewImg(event) {
    var img = event.currentTarget.dataset.image;
    var imgs = [img, ]
    wx.previewImage({
      current: img,
      urls: imgs,
    })
  },

  // tabbar跳转
  jump(e) {
    let page = e.currentTarget.dataset.page;
    PageJumpUtil.jump(true, page);
  },

  /**
   * 跳转到我的资料页面
   */
  jumpToMydata() {
    wx.navigateTo({
      url: './teacher-data/teacher-data',
    })
  },
  jumpToSetting(){
    wx.navigateTo({
      url: './teacher-setting/teacher-setting',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      var loginuser=wx.getStorageSync('loginuser');
      console.log(loginuser)
      if(loginuser){
        this.setData({
          teachername: loginuser.name,
          teacheravatar: loginuser.avatar,
        })
      }else{
        wx.showToast({
          title: '未登录，请登录后重试',
          icon:'none',
          duration:3000
        })
        
        setTimeout(function(){
          wx.navigateTo({
            url: '../../login/login',
          })
        },3000);
        
      }
    }catch(e){}
    
    
    if (app.globalData.courses) {
      console.log(app.globalData.courses)
      this.setData({
        courses: {
          allcourses: app.globalData.courses.allcourses,
          processing: app.globalData.courses.processing,
          processingnum: app.globalData.courses.processingnum,
          review: app.globalData.courses.review,
          reviewnum: app.globalData.courses.reviewnum,
          archive: app.globalData.courses.archive,
          archivenum: app.globalData.courses.archivenum
        }
      })
    } else {
      this.setData({
        courses: {
          allcourses: [],
          processing: [],
          processingnum: 0,
          review: [],
          reviewnum: 0,
          archive: [],
          archivenum: 0
        }
      })
    }

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