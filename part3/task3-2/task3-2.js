//获取节点
var getNode = function (ele) {
    return document.querySelector(ele);
};

//生成表格
var createTable = function (node, col, row) {
	var tableNode = document.createElement("table");
	for (var i = 0; i < col; i++) {
		trNode = document.createElement("tr");
		for (var j = 0; j < row; j++) {
			tdNode = document.createElement("td");
			trNode.appendChild(tdNode);
		}
		tableNode.appendChild(trNode);
	}
	node.appendChild(tableNode);
};

//忘表格里面增加数据项
var addItems = function (arguments) {
    for(var col = 0, row = 0; row < createTable.row; row++) {
        tableData[col][row] = arguments[row];
        col++;
    }
    return tableData;
};

var tableData = {
};

//设置可排序的项
var setItems = function (items) {
	
};

//排序方法
var orderMethod = function () {
};

//渲染更新数据列表
var renderTable = function () {
	//对tableData里面的数组进行渲染
};