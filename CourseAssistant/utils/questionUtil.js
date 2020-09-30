// 处理题目
function question(q, type) {
  // 以下关于线性分类器说法不正确的（    ）$A:线性分类器的一种直观的最优决策边界为最大间隔边界$B:线性可分的情形下，线性分类器的决策边界可以是多样的$C:线性分类器打分越高的样例越离决策边界越近，具有更高的分类置信度$D:训练好的SVM模型直接给出样例的列别标签

  // 选择、判断
  if (type === 0) {
    let strs = q.split('$');
    if (!strs || strs.length === 0) {
      return undefined;
    }
    // 第一行为题干
    let tg = strs[0];
    strs.shift();
    // 剩下的为选项
    let res = {
      question: tg,
      options: strs,
    };
    return res;
  }
  // 填空
  else if (type === 1) {
    let answers = q['panswer'].split('$');
    q['panswer'] = answers;
    console.log(q);
    return q;
  }
}


module.exports = {
  question: question
}