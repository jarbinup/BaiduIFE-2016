/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInput = document.getElementById('aqi-city-input').value.trim();
    var aqiInput = document.getElementById('aqi-value-input').value.trim();

    if(!cityInput.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert('城市必须为中英文字符！');
        return;
    }
    if(!aqiInput.match(/^[0-9]+$/)) {
        alert('污染质量指数必须为整数！');
        return;
    }
    aqiData[cityInput] = aqiInput;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var cityValue in aqiData){
        aqiHTML += "<tr><td>" +cityValue+ "</td><td>" +aqiData[cityValue]+ "</td><td><button type='button' onclick='delBtnHandle(\"" +cityValue+ "\")'>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = cityValue ? aqiHTML : "";
    
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(cityValue) {
    // do sth.
    delete aqiData[cityValue];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle,false);
}

init();