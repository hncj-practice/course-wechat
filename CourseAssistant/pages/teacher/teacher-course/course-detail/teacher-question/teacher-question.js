// pages/teacher/teacher-course/course-detail/teacher-question/teacher-question.js
var util=require("../../../../../utils/util.js");
var questionUtil=require("../../../../../utils/questionUtil.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showXZ: false,
    showPD: false,
    showTK: false
  },

  
  getChapterDetail(options){
    var chapterid=options.chapterid;
    var url="https://123.56.156.212/Interface/problem/getproblembychapterid";
    var data={
      chapterid:chapterid
    }
    util.myAjaxPost(url,data).then(res=>{
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }

      var data=res.data.data;
      var choice=[],fill=[],judge=[];
      data.forEach(item => {
        if(item.ptype=="1"){//选择题
          item.question = questionUtil.question(item.question);
          choice.push(item);
        }else if(item.ptype=="2"){//填空
          fill.push(item);
        }else if(item.ptype=="3"){//判断
          item.question = questionUtil.question(item.question);
          judge.push(item);
        }
      });

      this.setData({
        problems:res.data.data,
        choice:choice,
        fill:fill,
        judge:judge
      })
    })
  },


  // 展开/关闭折叠菜单
  trigger(e) {
    let q = e.currentTarget.dataset.q;
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
    this.getChapterDetail(options);
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