// pages/student/student-msg/student-msg.js

var PageJumpUtil = require('../../../utils/PageJumpUtil.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGoing: true,
    showEnded: true
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

  //获取试卷信息
  getPaper(){
    var studentid=this.data.loginuser.sno;
    var url="https://fengyezhan.xyz/Interface/paper/findpaperbysno";
    var data={
      studentid:studentid
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
      var len=data.length;
      // var processing=[],finish=[];
      for(var i=0;i<len;i++){
        data[i].start=util.formatTime(data[i].starttime,2);
        data[i].end=util.formatTime(data[i].endtime,2);
      //   if(data[i].status==1){
      //     processing.push(data[i]);
      //   }else if(data[i].status==2){
      //     finish.push(data[i])
      //   }
      }
      this.setData({
        papers:data,
        // processing:processing,
        // finish,finish
      })
    })
  },
  //跳转到试卷详情页
  jumpToPaper(event) {
    var paper = event.currentTarget.dataset.paper;
    var paperid=paper.paperid;
    var papername=paper.papername;
    var start=paper.start;
    var end=paper.end;
    var choicescore=paper.choicepoints;
    var fillscore=paper.fillpoints;
    var judgescore=paper.judgepoints
    wx.navigateTo({
      url: './student-paper/student-paper?paperid=' + paperid+'&papername='+papername+'&start='+start+'&end='+end+'&choicescore='+choicescore+'&fillscore='+fillscore+'&judgescore='+judgescore,
    })
  },
  //跳转到成绩页面
  jumpToScore(event){
    var score=0;
    var paperid=event.currentTarget.dataset.paperid;
    var url="https://fengyezhan.xyz/Interface/paper/findscorebysnoandpaperid";
    var data={
      studentid:this.data.loginuser.sno,
      paperid:paperid
    }
    util.myAjaxPost(url,data).then(res=>{
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
        return
      }
      score=res.data.data;
      wx.navigateTo({
        url: './paper-score/paper-score?score='+score+'&paperid='+paperid,
      })
    });
    
  },


  // 切换折叠菜单
  trigger(e) {
    let log = e.currentTarget.dataset.tag;
    if (log === 'going') {
      this.setData({
        showGoing: !this.data.showGoing
      });
    } else {
      this.setData({
        showEnded: !this.data.showEnded
      });
    }

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
    this.getPaper();
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

    wx.showNavigationBarLoading();
    this.getPaper();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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