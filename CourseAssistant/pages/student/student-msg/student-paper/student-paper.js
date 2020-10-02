const util = require("../../../../utils/util");
const questionUtil = require("../../../../utils/questionUtil.js");
// pages/student/student-msg/student-paper/student-paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    //选择的
    choices: [],
    //判断
    judges: [],
    //填空
    fills: []

  },
  initdata(options) {
    var paperid = options.paperid;
    var papername = options.papername;
    var start = options.start;
    var end = options.end;
    var choicescore = options.choicescore;
    var fillscore = options.fillscore;
    var judgescore = options.judgescore
    this.setData({
      paperid: paperid,
      papername: papername,
      start: start,
      end: end,
      choicescore: choicescore,
      fillscore: fillscore,
      judgescore: judgescore
    })
    //获取登录账号信息
    this.isLogin();
  },


  // 做题前警告
  showWarning() {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '请不要再答题过程中离开此页面！！',
      success: (res) => {
        if (res.confirm) {
          // console.log('开始做题');

          // 请求数据
          // ajax();
          that.getPaper();

        } else {
          // console.log('返回');
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
    // console.log(data)
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
          item.question = questionUtil.question(item.question, 0);
          choice.push(item);
        } else if (item.ptype == "2") { //填空
          item = questionUtil.question(item, 1);
          fill.push(item);
        } else if (item.ptype == "3") { //判断
          item.question = questionUtil.question(item.question, 0);
          judge.push(item);
        }
      });

      this.setData({
        problems: res.data.data,
        choice: choice,
        fill: fill,
        judge: judge
      })

      // 初始化填空题。。
      let n = fill.length;
      let new_fills = [];
      for (let i = 0; i < n; i++) {
        new_fills.push([null, null, null, null, null, null]);
      }
      this.setData({
        fills: new_fills
      });

      // let arr = this.data.fills;
      // arr[0][0] = '111';
      // arr[2][0] = '333';
      // arr[4][1] = '222';
      // this.setData({
      //   fills: arr
      // });

    })
  },

  // 点击交卷
  onSubmitPaper() {
    // console.log('点击交卷');
    wx.showModal({
      title: '警告',
      content: '请确认答题完毕再点击交卷！！',
      success: (res) => {
        if (res.confirm) {
          this.submitPaper();
        } else {
          // console.log('取消');
        }
      }
    })
  },

  //选择题radio状态改变
  choicechange(event) {
    console.log(event);
    var status = false;
    var choice = event.detail.value;
    var id = event.currentTarget.dataset.id;
    var answer = event.currentTarget.dataset.answer;
    // var score=parseInt(event.currentTarget.dataset.score);
    // console.log("choice:" + choice);
    // console.log("id:" + id)
    // console.log("answer:" + answer);
    // console.log("score:"+score)
    if (choice == 0 && answer == "A") {
      status = true;
    } else if (choice == 1 && answer == "B") {
      status = true;
    } else if (choice == 2 && answer == "C") {
      status = true;
    } else if (choice == 3 && answer == "D") {
      status = true;
    } else {
      status = false;
    }

    var choices = this.data.choices;

    choices[id] = status;

    this.setData({
      choices: choices
    })
  },

  //判断题radio状态改变
  judgechange(event) {
    var status = false;
    var judge = event.detail.value;
    var id = event.currentTarget.dataset.id;
    var answer = event.currentTarget.dataset.answer;
    // console.log("judge:" + judge);
    // console.log("id:" + id)
    // console.log("answer:" + answer);
    // console.log("score:"+score)
    if (judge == 0 && answer == "A") {
      status = true;
    } else if (judge == 1 && answer == "B") {
      status = true;
    } else {
      status = false;
    }

    var judges = this.data.judges;

    judges[id] = status;

    this.setData({
      judges: judges
    })
  },

  //填空题
  fillchange(event) {
    var id = parseInt(event.currentTarget.dataset.id);
    var inputvalue = event.detail.value;
    var num = parseInt(event.currentTarget.dataset.num);
    // console.log("id:" + id);
    // console.log("input:" + inputvalue);
    // console.log("num:" + num);

    var fills = this.data.fills;

    fills[id][num] = inputvalue;
    this.setData({
      fills: fills
    })
  },


  // 交卷
  submitPaper() {
    console.log('提交试卷');
    var score = 0;

    var choicescore = parseInt(this.data.choicescore);
    var fillscore = parseInt(this.data.fillscore);
    var judgescore = parseInt(this.data.judgescore);

    var choices = this.data.choices;
    var judges = this.data.judges;
    var fills = this.data.fills;
    var choiceslen = choices.length;
    var judgeslen = this.data.judges.length;
    var fillslen = this.data.fills.length;
    if (choiceslen < 1 || judgeslen < 1 || fillslen < 1) {
      wx.showToast({
        title: '试卷未完成，请检查',
        icon: 'none'
      })
      return;
    }
    var choice = this.data.choice;
    var judge = this.data.judge;
    var fill = this.data.fill;
    var choicelen = choice.length;
    var judgelen = judge.length;
    var filllen = fill.length;
    choices.forEach(item => {
      if (item == null || choiceslen < choicelen) {
        wx.showToast({
          title: '选择题未完成，请检查',
          icon: 'none'
        })
        return;
      }
    });
    judges.forEach(item => {
      if (item == null || judgeslen < judgelen) {
        wx.showToast({
          title: '判断题未完成，请检查',
          icon: 'none'
        })
        return;
      }
    });
    for (var i = 0; i < filllen; i++) {
      for (var j = 0; j < 6; j++) {
        if (fill[i].panswer[j]&&fills[i][j] != null && fills[i][j] == fill[i].panswer[j]) {
          score=score+fillscore;
        }
      }
    }
    //获取填空题的空数
    var count=0;
    fill.forEach(item => {
      item.panswer.forEach(it => {
        if (it != null) {
          count=count+1;
        }
      })
    })

    choices.forEach(item => {
      if (item) {
        score = score + choicescore;
      }
    })
    judges.forEach(item => {
      if (item) {
        score = score + judgescore;
      }
    })

    var all=choicelen*choicescore+judgelen*judgescore+count*fillscore;
    var score_percentile=((score/all)*100).toFixed(0);//四舍五入取整数

    // console.log("count:"+count);
    // console.log("score:"+score);
    // console.log("all:"+all);
    // console.log("percentile:"+score_percentile);

    // this.setData({
    //   score: score_percentile
    // })

    //提交学生成绩并修改学生课程状态
    this.submitscore(score_percentile);

    //跳转到成绩页面
    wx.redirectTo({
      url: '../paper-score/paper-score?score=' + score_percentile,
    })
  },
  //提交学生成绩
  submitscore(score){
    var url="https://fengyezhan.xyz/Interface/paper/updatetestgrade";
    var data={
      sno:this.data.loginuser.sno,
      paperid:this.data.paperid,
      grade:score
    }
    util.myAjaxPost(url,data).then(res=>{
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
        return
      }
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