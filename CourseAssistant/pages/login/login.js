// pages/login/login.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    picker: ['请选择账号类型','学生', '教师', '管理员'],
  },
  /**
   * 登录操作
   */
  loginBox:function(event){
    var that=this;
    that.setData({
      username: event.detail.value.username,
      password: event.detail.value.pwd
    })

    var url = "https://fengyezhan.xyz/Interface/account/login";
    var data={
      username: event.detail.value.username,
      password: event.detail.value.pwd,
      type : that.data.index
    };

    util.myAjaxPost(url, data).then(res => {
      var d=res.data;
      console.log(d.code);
      wx.showToast({
        title: d.message,
        icon:'none'
      })
      if(res.data.code!=200){
        return;
      }
      app.globalData.loginuser=res.data.data;
      console.log(app.globalData.loginuser);

      wx.navigateTo({
        url: '../teacher/teacher-index/teacher-index',
      })
      
      
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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