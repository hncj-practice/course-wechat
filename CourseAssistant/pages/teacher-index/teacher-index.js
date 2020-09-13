// pages/teacher-index/teacher-index.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    // 轮播图
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/swiper/01.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '../../images/swiper/02.jpg'
    }, {
      id: 2,
      type: 'image',
      url: '../../images/swiper/03.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '../../images/swiper/04.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '../../images/swiper/05.png'
    }],

    // 常用
    commonly: [{
        name: "数据科学",
        url: "../../images/courses/数据科学.jpg"
      },
      {
        name: "云计算技术与应用",
        url: "../../images/courses/云计算技术与应用.jpg"
      }
    ],

    // 最近使用
    recently: [{
        name: "Java高级应用",
        url: "../../images/courses/Java高级应用.png"
      },
      {
        name: "数据可视化",
        url: "../../images/courses/数据可视化.jpg"
      }
    ],
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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