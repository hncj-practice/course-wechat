// pages/student/student-me/student-score/student-score.js
var util=require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [
      // '2019-2020学年第二学期',
      // '2019-2020学年第一学期',
      // '2018-2019学年第二学期',
      // '2018-2019学年第一学期',
    ],
  },

  getSemester(){
    var url="http://123.56.156.212/Interface/semester/allsemester";
    util.myAjaxGet(url).then(res=>{
      if (res.data.code != 200) {
        wx.showToast({
          title: d.message,
          icon: 'none'
        })
        return;
      }
      var data=[];
      var semester=res.data.data;
      semester.forEach(item=>{
        data.push(item.semestername)
      })
      

      this.setData({
        picker:data,
        semester:semester
      })
    })
  },

  getFinalGrade(){
    var url="http://123.56.156.212/Interface/grade/getfinalgrade";
    var data={
      studentid:this.data.loginuser.sno,
      semesterid:this.data.semesterid
    }
    util.myAjaxPost(url,data).then(res=>{
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        return;
      }
      this.setData({
        finalgrade:res.data.data
      })
    })
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


  PickerChange(e) {
    // console.log(e);
    this.setData({
      index: e.detail.value,
      semesterid:this.data.semester[e.detail.value].semesterid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin();
    this.getSemester();
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