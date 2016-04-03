function getData() {
  var source = document.getElementById('source') ;
  var sourceLi = document.querySelectorAll('#source li');
  var data = [];
  for(var i = 0,j = sourceLi.length; i < j; i++){
      // 获得元素节点的文本
      var text = sourceLi[i].textContent;
      // 将字符串分割
      var targetList = text.split(/空气质量：/g);
      data.push([targetList[0], +targetList[1]]);  
    
  }
  return data;
}

function sortAqidata(data){
  data.sort(function(a, b){
    return a[1] - b[1];
  });
  return data;
}

function render(data) {
  var resor = document.getElementById('resort');
  var util = ['一','二','三','四','五','六','七','八','九','十'];
  for (var i = 0,j = data.length;i < j; i++) {
    var fir = document.createElement('li');
    fir.innerHTML = '第' + util[i] + '名：' + data[i][0] + '空气质量：' + '<b>' + data[i][1]+ '</b>' + '<br>';
    resor.appendChild(fir);
  }
}

function btnHandle(){
  var aqiData = getData();
  aqiData = sortAqidata(aqiData);
  aqiData = render(aqiData);
}

function init(){
  document.getElementById('sort-btn').addEventListener('click', btnHandle);
}

init();