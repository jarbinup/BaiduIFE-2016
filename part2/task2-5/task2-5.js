window.onload = function () {
// 以下两个函数用于随机模拟生成测试数据
function getDateStr (dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData (seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = "";
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() *seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData; 
}

//存放模拟生成的数据
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};


//用于渲染图表的数据
var chartData = {};

//记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

//渲染图表
function renderChart() {
    var str = '';
    var argIndex = Object.keys(chartData);
    var chartWrap = document.getElementById("aqi-chart-wrap");
    var width = {
        "day": 14,
        "week": 35,
        "month": 60
    };

    function randomColor() {
        return Math.floor(Math.random() *255);
    }

    for(var i = 0; i < argIndex.length; i++) {
         str += '<div title="日期:' +argIndex[i]+ '\n污染指数:' +chartData[argIndex[i]]+ '"style="height:' +chartData[argIndex[i]]+ 'px; width:' +width[pageState.nowGraTime]+ 'px;background-color:rgb('+randomColor()+','+randomColor()+','+randomColor()+')"></div>';       
    }
    chartWrap.innerHTML =  str;
}

//日，周，月的radio事件点击时的处理函数
function graTimeChange (event) {
    var target = event.target;

    if (pageState.nowGraTime == target.value) {
        return;
    } else {
        pageState.nowGraTime = target.value;
        console.log(pageState.nowGraTime);
    }
    initAqiChartData();
    renderChart();
}

//select发生变化时的处理函数
function citySelectChange (event) {
    var target = event.target;

    if (pageState.nowSelectCity == target.value) {
        return;
    } else {
        pageState.nowSelectCity = this.value;
    }
  initAqiChartData();
  renderChart();
}

//初始化radio事件
function initGraTimeFrom () {
    var formGraTime = document.querySelector("#form-gra-time");
    formGraTime.addEventListener("click", graTimeChange, false);
  
}

//初始化城市select下拉列表
function initCitySelector () {
    var citySelect = document.querySelector("#city-select");
    var cityOpt = '';
    for (var city in aqiSourceData) {
        cityOpt += '<option>' + city +'</option>';
    }
    citySelect.innerHTML = cityOpt;
    citySelect.addEventListener("click", citySelectChange, false);
}

//初始化图表需要的数据格式
function initAqiChartData () {
    var showType = pageState.nowGraTime;
    console.log("initAqiChartData: " + showType);
    var showCity = pageState.nowSelectCity;
    var aqiIndex = Object.keys(aqiSourceData[showCity]);
    console.log("initAqiChartData: " + showCity);

    if(showType == "day") {
        chartData = {};
        chartData = aqiSourceData[showCity];
        console.log("initAqiChartData: daydata");
    }

    else if(showType == "week") {
        chartData = {};
        var count = 0,
            week = 1,
            weekSum = 0;
        for(var i = 0; i < 92; i++) {
            weekSum += aqiSourceData[showCity][aqiIndex[i]];
            count++;
            if(count % 7 === 0) {
                chartData["第"+week+"周"] = Math.round(weekSum/7);
                week++;
                weekSum = 0;
            }           
        }
        console.log("initAqiChartData: weekdata");
    }

    else{
        chartData = {};
        var count = 0,
            month = 1,
            monthSum =0;
        for(var i = 0; i < 92; i++) {
            monthSum += aqiSourceData[showCity][aqiIndex[i]];
            count++;
            if(count % 30 === 0) {
                chartData["第"+month+"月"] = Math.round(monthSum/30);
                month++;
                monthSum = 0;
            }            
        }

        console.log("initAqiChartData: monthdata");
    }
    
    console.log("initAqiChartData: " +chartData);
}

//初始化函数
function init () {
    initGraTimeFrom();
    initCitySelector();
    initAqiChartData();
}

init();
}
