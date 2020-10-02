// pages/student/student-me/student-data/student-data.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
/**
   * 判断当前用户是否登录
   */
  isLogin(){
    try{
      var loginuser=wx.getStorageSync('loginuser');
      // console.log(loginuser)
      if(loginuser){
        this.setData({
          loginuser: loginuser
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

  }
})