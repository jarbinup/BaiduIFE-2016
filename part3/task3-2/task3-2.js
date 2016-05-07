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


//往表格里面增加数据项
var addItems = function (arguments) {
	var tableCol = [];
    for(var row = 0; row < arguments.length; row++) {   
        tableCol[row] = arguments[row];
    }
    tableData[count] = tableCol;
    renderTable(count, arguments.length);
    count++;
};

var count = 0;
var tableData = {};

//设置可排序的项
var setItems = function (item) {
	for (var i = 0; i < tableData[0].length; i++) {
		if(tableData[0][i] == item){
			node = getNode('table').childNodes[0].childNodes[i];
		    addIcon(node, i);
		}
	};
};

//添加排序图标
var addIcon = function(btnNode, num) {
	var span = document.createElement('span');
	var upBtn = document.createElement('button');
	var downBtn = document.createElement('button');
	span.appendChild(upBtn);
	span.appendChild(downBtn);
	btnNode.appendChild(span);
	var inArray = {};
	var comparray = [];
	for(var i = 1; i < Object.keys(tableData).length; i++) {
		comparray[i] = tableData[i][num];
		inArray[i] = tableData[i];
	}

	for(var o in inArray){
		console.log(o);
	}
	console.log(inArray);

	console.log(comparray);
	function compare(value1, value2){
        return value2-value1;
    }

    comparray.sort(compare);
    console.log(comparray);

    for(var j = 1; j < Object.keys(tableData).length; j++) {
    	for(var m in inArray){
            if(inArray[m][j] == comparray[j-1]){
            tableData[j] = inArray[m];
            renderTable(j, comparray.length);
            }
    	}
    }

    console.log(tableData)



	// upBtn.onclick = function () {
	// 	orderMethod.up(comparray);
	// 	for(var j = 1; j < tableData.length; j++) {
	// 		tableData[j] = comparray[j][num];
	// 	}

	// };
	// downBtn.onclick = function () {
	// 	orderMethod.down(comparray);
	// };
}
//排序方法
// var orderMethod = (function (arguments) {
   
//     function compare(value1, value2){
//         return value2-value1;
//     };
//     return{
//     	up: array.sort(compare),
//     	down: this.up.reverse()
//     };
// })();

//渲染更新数据列表
var renderTable = function (count, num) {
	//对tableData里面的数组进行渲染
	console.log(count,num);
	var tds = getNode('table').childNodes[count].childNodes;
	for(var i = 0; i < num; i++) {
	    tds[i].innerHTML = tableData[count][i];
	}
};

var tableWrap = getNode('section');
createTable(tableWrap, 5, 5);
addItems(['姓名', '语文', '数学', '英语', '总分']);
addItems(['bean1', '10', '79', '75', '234']);
addItems(['bean2', '30', '79', '75', '234']);
addItems(['bean3', '20', '79', '75', '234']);
addItems(['bean4', '90', '79', '75', '234']);
setItems('语文');
// setItems('数学');


