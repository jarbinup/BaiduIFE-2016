//获取节点
var getNode = function (ele) {
    return document.querySelector(ele);
};

//选择时间上下限
var period = function (num) {
	var now = new Date();
	var nowYear = now.getFullYear();
	var lowerBoundaryYear = nowYear - num;
	var upperBoundaryYear = nowYear + num;
	return {
		nowYear: nowYear,
		lowerBoundaryYear: lowerBoundaryYear,
	    upperBoundaryYear: upperBoundaryYear
	};
};

//给定年份和月份，获取每月的天数
var getDayData = function (year, month) {
    var showMonthNode = getNode('.show-month');
    var dayData = [];
    var weekData = [];
    var count = 0;
    showMonthNode.innerHTML = year +'年' +month+ '月' ;
    for(var i = 1; i < 32; i++){
        var nextDay = new Date();
        nextDay.setFullYear(year, month-1, i);
        if(nextDay.getMonth() == month-1) {
        	weekData.push(nextDay.getDate());
            dayData.push(nextDay.getDay());
        }
    }
    renderTable(dayData,weekData);
    // console.log(dayData);
    // console.log(weekData);
};

var j = 1;
var weekNode = getNode('.week'+j).querySelectorAll('td');

var renderTable = function (day, date) {
	console.log(day);
    console.log(date);
    var qi = document.querySelectorAll('.week td');
    
    for(var m = 0; m < qi.length; m++){
    	qi[m].innerHTML = "";
    }
	for(var i = 0; i<date.length; i++){
		weekNode[day[i]].innerHTML = date[i];
		if(day[i] == 6) {
			j++;
			if(j < 7){
				weekNode = getNode('.week'+j).querySelectorAll('td');
			}
			else{
			 	j = 1;
				weekNode = getNode('.week'+j).querySelectorAll('td');
			}
                
		}
	}
};
