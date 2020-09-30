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
    fills: [
    //   {
    //   pid: 7,
    //   chapterid: 1,
    //   ptype: 2,
    //   question: '数据仓库就是一个____、集成的、____、反映历史变化的数据集合。',
    //   panswer: '面向主题的$面向稳定的',
    //   ptypename: '填空题'
    // }
  ]

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
  },


  // 做题前警告
  showWarning() {
    var that = this;
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

  //选择题radio状态改变
  choicechange(event) {
    console.log(event);
    var status = false;
    var choice = event.detail.value;
    var id = event.currentTarget.dataset.id;
    var answer = event.currentTarget.dataset.answer;
    // var score=parseInt(event.currentTarget.dataset.score);
    console.log("choice:" + choice);
    console.log("id:" + id)
    console.log("answer:" + answer);
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
    console.log("judge:" + judge);
    console.log("id:" + id)
    console.log("answer:" + answer);
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


  // 交卷
  submitPaper() {
    console.log('提交试卷');
    var score = 0;

    var choicescore = parseInt(this.data.choicescore);
    var fillscore = parseInt(this.data.fillscore);
    var judgescore = parseInt(this.data.judgescore);

    var choices = this.data.choices;
    var judges = this.data.judges;
    var choiceslen = choices.length;
    var judgeslen = this.data.judges.length;
    if (choiceslen < 1 || judgeslen < 1) {
      wx.showToast({
        title: '试卷未完成，请检查',
        icon: 'none'
      })
      return;
    }
    var choice = this.data.choice;
    var judge = this.data.judge;
    var choicelen = choice.length;
    var judgelen = judge.length;
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

    this.setData({
      score: score
    })

    //跳转到成绩页面
    wx.redirectTo({
      url: '../paper-score/paper-score?score=' + score,
    })
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