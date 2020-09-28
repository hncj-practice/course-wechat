// pages/student/student-msg/student-paper/student-paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 做题前警告
  showWarning() {
    wx.showModal({
      title: '警告',
      content: '请不要再答题过程中离开此页面！！',
      success: (res) => {
        if (res.confirm) {
          console.log('开始做题');

          // 请求数据
          // ajax();


        } else {
          console.log('返回');
          wx.navigateBack();
        }
      }
    });
  },

  // 点击交卷
  onSubmitPaper() {
    console.log('点击交卷');
    wx.showModal({
      title: '警告',
      content: '请确认答题完毕再点击交卷！！',
      success: (res) => {
        if (res.confirm) {
          this.submitPaper();
        } else {
          console.log('取消');
        }
      }
    })
  },


  // 交卷
  submitPaper() {
    console.log('提交试卷');

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showWarning();
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