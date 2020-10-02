// pages/student/student-index/student-index.js

var PageJumpUtil = require('../../../utils/PageJumpUtil.js');
var util = require('../../../utils/util.js')
var app = getApp();
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
      url: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/01.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/02.jpg'
    }, {
      id: 2,
      type: 'image',
      url: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/03.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/04.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/fyz/images/05.png'
    }],
  },
  //判断当前用户是否登录
  isLogin() {
    try {
      var loginuser = wx.getStorageSync('loginuser');
      // console.log(loginuser)
      if (loginuser) {
        this.setData({
          sno: loginuser.sno
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
   * 查询当前登录学生所学习的所有课程
   */
  getCourse() {
    var that = this;
    var url = "https://fengyezhan.xyz/Interface/course/getcoursebysno";
    var data = {
      studentid: this.data.sno,
      semesterid: 1
    }
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }

      var courses = res.data.data;
      //分别代表：进行中、审核中、归档
      var processingNum = 0,
        reviewNum = 0,
        archiveNum = 0;
      var processing = [],
        review = [],
        archive = [];
      courses.forEach(item => {
        if (item.status == "1") {
          processing.push(item)
          processingNum += 1;
        } else if (item.status == "2") {
          reviewNum += 1;
          review.push(item)
        } else if (item.status == "3") {
          archiveNum += 1;
          archive.push(item)
        }
      });
      var list = {
        allcourses: courses,
        processing: processing,
        processingnum: processingNum,
        review: review,
        reviewnum: reviewNum,
        archive: archive,
        archivenum: archiveNum,
      }
      app.globalData.courses = list;
      // console.log(app.globalData.courses)

      that.setData({
        recently: res.data.data
      })
    })
  },
  //跳转到课程页面
  gotocourse(event) {
    var courseid = event.currentTarget.dataset.courseid;
    // wx.showToast({
    //   title: '跳转到课程页面',
    //   icon: 'none'
    // })
    // console.log("跳转到课程页面");
    wx.navigateTo({
      url: '../student-course/course-detail/course-detail?courseid=' + courseid
    })
  },
  // 轮播图切换
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
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
    this.getCourse();
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