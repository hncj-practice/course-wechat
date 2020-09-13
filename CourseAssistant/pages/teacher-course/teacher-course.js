// pages/teacher-course/teacher-course.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    courses: [{
        name: "Java高级应用",
        url: "../../images/courses/Java高级应用.png",
        number: 67
      }, {
        name: "数据科学",
        url: "../../images/courses/数据科学.jpg",
        number: 67
      },
      {
        name: "云计算技术与应用",
        url: "../../images/courses/云计算技术与应用.jpg",
        number: 67
      },
      {
        name: "数据可视化",
        url: "../../images/courses/数据可视化.jpg",
        number: 67
      }, {
        name: "Java高级应用",
        url: "../../images/courses/Java高级应用.png",
        number: 67
      }, {
        name: "数据科学",
        url: "../../images/courses/数据科学.jpg",
        number: 67
      },
      {
        name: "云计算技术与应用",
        url: "../../images/courses/云计算技术与应用.jpg",
        number: 67
      },
      {
        name: "数据可视化",
        url: "../../images/courses/数据可视化.jpg",
        number: 67
      }
    ]
  },


  jumpToIndex() {
    if (util.getCurrentPage() === "pages/teacher-index/teacher-index") {
      return;
    }
    wx.redirectTo({
      url: '../../pages/teacher-index/teacher-index',
    })
  },

  jumpToMsg() {
    if (util.getCurrentPage() === "pages/teacher-msg/teacher-msg") {
      return;
    }
    wx.redirectTo({
      url: '../../pages/teacher-msg/teacher-msg',
    })
  },

  jumpToCourse() {
    if (util.getCurrentPage() === "pages/teacher-course/teacher-course") {
      return;
    }
    wx.redirectTo({
      url: '../../pages/teacher-course/teacher-course',
    })
  },

  jumpToMe() {
    if (util.getCurrentPage() === "pages/pages/teacher-me/teacher-me") {
      return;
    }
    wx.redirectTo({
      url: '../../pages/teacher-me/teacher-me',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})