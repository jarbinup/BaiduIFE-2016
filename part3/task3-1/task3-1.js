//获取节点
var getNode = function (ele) {
    return document.querySelector(ele);
};

//改变遮罩状态
var maskChange = function(bclname, aclname) {
    var maskNode = getNode(bclname);
    maskNode.setAttribute('class', aclname);
    return maskNode;
};

//实现拖拽
var drag = function (node) {
	var dragNode = getNode(node);
	//鼠标点击下时计算与client的距离
	dragNode.onmousedown = function(event) {
	    dragNode.onmousemove = function(event) {
			var clientDis = {
				offsetL: dragNode.offsetLeft,
	        	offsetT: dragNode.offsetTop,
	            clientX: event.clientX,
	        	clientY: event.clientY
			};
			console.log(clientDis);
			dragNode.style.left = clientDis.clientX +'px';
			dragNode.style.top = clientDis.clientY +'px';
		};
	};
	dragNode.onmouseup = function(event) {
		dragNode.onmousemove = null;
	};
}


getNode('#mask-btn').addEventListener('click', function(){
	maskChange('.mask-hidden', 'mask mask-show');
}, false);

getNode('#quik').addEventListener('click', function(){
	maskChange('.mask-show', 'mask mask-hidden');
}, false);

//阻止dialog向上冒泡
getNode('.dialog').addEventListener('click', function(){
	event.stopPropagation();
}, false);

getNode('.mask').addEventListener('click', function(){
	maskChange('.mask-show', 'mask mask-hidden');
}, false);

drag('.dialog');
