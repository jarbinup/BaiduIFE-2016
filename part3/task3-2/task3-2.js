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
    // console.log(tableData);
    count++;
};

//为表格中的每一行计数
var count = 0;

//添加到表格中的数据
var tableData = {};

//需要比较的列
var compArrayObj = {};

//保存初始的排列顺序
var beforeOrder = {};

//设置可排序的项
var addSeqMethod = function (item) {
	for (var i = 0; i < tableData[0].length; i++) {
		if(tableData[0][i] == item){
			node = getNode('table').childNodes[0].childNodes[i];
		    addIcon(node, i);
		}
	};
};

//渲染更新数据列表
var renderTable = function (count, num) {
	//对tableData里面的数组进行渲染
	//console.log(count,num);
	var tds = getNode('table').childNodes[count].childNodes;
	for(var i = 0; i < num; i++) {
	    tds[i].innerHTML = tableData[count][i];
	}
};

//添加排序图标
var addIcon = function (btnNode, item) {
	var span = document.createElement('span');
	var upBtn = document.createElement('button');
	upBtn.setAttribute('class','up-btn');
	var downBtn = document.createElement('button');
	downBtn.setAttribute('class','down-btn');
	span.appendChild(upBtn);
	span.appendChild(downBtn);
	btnNode.appendChild(span);
    
    //取出按钮所在列的数据保存在compArray数组中
    //beforeOrder中保存排序之前的状态
    
	var compArray= [];
	for(var i = 1; i < Object.keys(tableData).length; i++) {
		compArray[i] = tableData[i][item];
		beforeOrder[i] = tableData[i];
	}

	compArrayObj[item] = compArray;

	//去掉第一项undefined
    compArray.shift();
	//抽出数组排序
    // console.log(compArrayObj);
    addEvent(btnNode, item);   
};


//绑定事件
var addEvent = function (node, item) {
	function compareAsc (value1, value2){
        return value2-value1;
	}

	function compareDes (value1, value2){
	    return value1-value2;
	}
    console.log(compArrayObj[item]);
    
    // console.log(ascArray);
    // console.log(desArray);

    var afterOrder = function (referArray, beforeOrder) {
	    for(var i = 0; i < referArray.length; i++) {
	    	for(var m  in beforeOrder ){
	    		if(beforeOrder[m][item] == referArray[i]) {
	    			tableData[i+1] = beforeOrder[m];
	    			renderTable(i+1, tableData[i+1].length);
	    		}
	        }
	    }    
    };
    
    //绑定事件
    node.onclick = function (event) {
    	target = event.target;
    	if(target.className == 'up-btn') {
    		var ascArray = compArrayObj[item].sort(compareDes);
    		//console.log(ascArray);
    		afterOrder(ascArray, beforeOrder);
    	}

    	if(target.className == 'down-btn') {
    		var desArray = compArrayObj[item].sort(compareAsc);
    		//console.log(desArray);
    		afterOrder(desArray, beforeOrder);
    	}
        
	};
};

var tableWrap = getNode('section');
createTable(tableWrap, 6, 5);
addItems(['姓名', '语文', '数学', '英语', '总分']);
addItems(['bean1', '2', '0', '2', '238']);
addItems(['bean2', '9', '8', '5', '264']);
addItems(['bean3', '7', '9', '7', '56']);
addItems(['bean4', '3', '1', '1', '78']);
addItems(['bean5', '10', '10', '10', '537']);
addSeqMethod('语文');
addSeqMethod('数学');
addSeqMethod('英语');
addSeqMethod('总分');