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

//给定年份和月份，用日期填充表格
var getDayData = function (year, month) {
    var showMonthNode = getNode('.show-month');
    showMonthNode.innerHTML = year +'年' +month+ '月' ;
    var showMonthObj = new Date(year, month-1);
    var showMonthObj1 = new Date(year,month-1,32);
    console.log(showMonthObj.getDate());
    console.log(showMonthObj1.getMonth());
    // for(i = 1, i < 33. i++){

    // }
    
};
