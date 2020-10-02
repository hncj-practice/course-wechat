// pages/student/student-me/student-me.js

var PageJumpUtil = require('../../../utils/PageJumpUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取登录用户信息
  isLogin() {
    try {
      var loginuser = wx.getStorageSync('loginuser');
      // console.log(loginuser)
      if (loginuser) {
        this.setData({
          loginuser: loginuser
        })
      } else {
        wx.showToast({
          title: '未登录，请登录后重试',
          icon: 'none',
          duration: 3000
        })

        setTimeout(function () {
          wx.navigateTo({
            url: '../../login/login',
          })
        }, 3000);

      }
    } catch (e) {}
  },
  /**
   * 跳转到我的资料页面
   */
  jumpToMydata() {
    wx.navigateTo({
      url: './student-data/student-data',
    })
  },
  jumpToScore(){
    wx.navigateTo({
      url: './student-score/student-score',
    })
  },
  jumpToSetting(){
    wx.navigateTo({
      url: './student-setting/student-setting',
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
  // tabbar跳转
  jump(e) {
    let page = e.currentTarget.dataset.page;
    PageJumpUtil.jump(false, page);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin();
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

  },


  // tabbar跳转



})