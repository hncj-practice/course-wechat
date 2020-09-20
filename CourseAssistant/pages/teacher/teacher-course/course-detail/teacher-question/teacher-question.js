// pages/teacher/teacher-course/course-detail/teacher-question/teacher-question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showXZ: false,
    showPD: false,
    showTK: false
  },


  trigger(e) {
    let q = e.currentTarget.dataset.q;
    console.log(q);
    switch (q) {
      case "xz":
        this.setData({
          showXZ: !this.data.showXZ
        })
        break;
      case "pd":
        this.setData({
          showPD: !this.data.showPD
        })
        break;
      case "tk":
        this.setData({
          showTK: !this.data.showTK
        })
        break;
    }
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