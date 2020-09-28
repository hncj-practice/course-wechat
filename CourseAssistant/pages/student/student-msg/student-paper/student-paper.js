const util = require("../../../../utils/util");
const questionUtil=require("../../../../utils/questionUtil.js");
// pages/student/student-msg/student-paper/student-paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  initdata(options){
    var paperid=options.paperid;
    var papername=options.papername;
    var start=options.start;
    var end=options.end;
    this.setData({
      paperid:paperid,
      papername:papername,
      start:start,
      end:end
    })
  },

  // 做题前警告
  showWarning() {
    var that=this;
    wx.showModal({
      title: '警告',
      content: '请不要再答题过程中离开此页面！！',
      success: (res) => {
        if (res.confirm) {
          console.log('开始做题');

          // 请求数据
          // ajax();
          that.getPaper();

        } else {
          console.log('返回');
          wx.navigateBack();
        }
      }
    });
  },
  //获取试卷详情信息
  getPaper() {
    var paperid = this.data.paperid;
    var url = "https://fengyezhan.xyz/Interface/problem/getproblembypaperid";
    var data = {
      paperid: paperid
    }
    console.log(data)
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }
      var data = res.data.data;
      var choice = [],
        fill = [],
        judge = [];
      data.forEach(item => {
        if (item.ptype == "1") { //选择题
          item.question = questionUtil.question(item.question);
          choice.push(item);
        } else if (item.ptype == "2") { //填空
          fill.push(item);
        } else if (item.ptype == "3") { //判断
          item.question = questionUtil.question(item.question);
          judge.push(item);
        }
      });

      this.setData({
        problems: res.data.data,
        choice: choice,
        fill: fill,
        judge: judge
      })
    })
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
    this.initdata(options);
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