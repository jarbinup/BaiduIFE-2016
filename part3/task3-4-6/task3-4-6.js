//获取节点
var getNode = function (ele) {
    return document.querySelector(ele);
};

//存放星期的数据
var dayData = [];

//设定日期接口，默认为当前日期，可指定
function setDate (str) {
    var now = new Date();
    var setnow = new Date(str);
    var showDate = (str == undefined)? now : setnow;
    return {
        year: showDate.getFullYear(),
        month: showDate.getMonth() + 1
    };
}

var year = setDate().year;
var month = setDate().month;

//给定年份和月份，获取每月的天数
function getDayData () {
	dayData = [];
    for(var i = 1; i < 32; i++){
        var nextDay = new Date();
        nextDay.setFullYear(year, month-1, i);
        if(nextDay.getMonth() == month-1) {
            dayData.push(nextDay.getDay());
        }
    }
    getNode('.show-month').innerHTML = year +'年'+ month +'月' ;
    renderTable();
}

//选择年月后，日期列表进行相应切换
function renderTable () {
	//清空表格
	var td = document.querySelectorAll('.week td');
    var inputBox = getNode('.input-box');
    for(var m = 0; m < td.length; m++){
    	td[m].innerHTML = "";
    }
    //重新写入
    var n = dayData[0];
    for(var i = 0; i < dayData.length; i++){
    	td[n].innerHTML = i+1;
        td[n].onclick = function(){
            inputBox.value = year +'年'+ month +'月' + event.target.childNodes[0].nodeValue +'日';
        };
        td[n].className = 'show-day';
    	n++;
    }   
}

function getDateStr (dat) {
    var datObj = new Date(dat);
    var y = datObj.getFullYear();
    var m = datObj.getMonth() + 1;
    var d = datObj.getDate();
    return {
        year: y,
        month: m,
        date: d
    };
}
//获取日期的接口
function godhelpme() {
    var inputBox = getNode('.input-box');
    var calendar = getNode('.calendar');
    calendar.style.display = 'none';
    var count = 1;
    inputBox.onclick = function(){
        count++;
        if(count%2==0){
           calendar.style.display = 'block'; 
        }else{
           calendar.style.display = 'none';    
        }
    }
}
//切换月份
function changeMonth() {
    getNode('.left').onclick = function(){
        if(month == 1) {
            year--;
            month = 12;
        }else{
            month--;
        }
        getDayData(year,month);  
    };

    getNode('.right').onclick = function(){
        if(month == 12) {
            year++;
            month = 1;
        }
        else{
            console.log("what the oh god help me left here");
            month++;
        }
        getDayData(year,month);
    };
}

getDayData();
changeMonth();
godhelpme();
