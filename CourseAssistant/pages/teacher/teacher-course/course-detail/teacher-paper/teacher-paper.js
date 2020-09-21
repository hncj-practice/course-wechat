// pages/teacher/teacher-course/course-detail/teacher-paper/teacher-paper.js
var util=require("../../../../../utils/util.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取试卷详情信息
   * @param {*} options 
   */
  getPaperDetail(options){
    var paperid=options.paperid;
    var url="https://fengyezhan.xyz/Interface/problem/getproblembypaperid";
    var data={
      paperid:paperid
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
          choice.push(item);
        }else if(item.ptype=="2"){//填空
          fill.push(item);
        }else if(item.ptype=="3"){//判断
          judge.push(fill);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPaperDetail(options);
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