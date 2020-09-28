const util = require("../../../../utils/util");

// pages/teacher/teacher-me/teacher-setting/teacher-setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changepwd:false,
    about:false
  },
  //获取登录用户信息
  isLogin() {
    try {
      var loginuser = wx.getStorageSync('loginuser');
      console.log(loginuser)
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
  //显示修改模态框
  showModify(){
    this.setData({
      changepwd:!this.data.changepwd
    })
  },
  showAbout(){
    this.setData({
      about:!this.data.about
    })
  },
  //修改密码
  modifyPwd(event){
    var that=this;
    var loginuser=that.data.loginuser;
    //获取工号
    var tno=loginuser.tno;
    //获取旧密码和新密码
    var olderpwd=event.detail.value.olderpwd;
    var newpwd=event.detail.value.newpwd;

    var url="https://fengyezhan.xyz/Interface/account/resetpwd";
    var data={
      username:tno,
      password:olderpwd,
      newpwd:newpwd,
      type:2
    }
    util.myAjaxPost(url,data).then(res=>{
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }
      setTimeout(function(){
        that.showModify();
        that.logout();
      },1000)
    })


  },

  /**
   * 退出登录
   */
  logout() {
    wx.reLaunch({
      url: '../../../login/login',
    })
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