//获取节点
var getNode = function (ele) {
    return document.querySelector(ele);
};

//改变遮罩状态
function maskChange (bclname, aclname) {
    var maskNode = getNode(bclname);
    maskNode.setAttribute('class', aclname);
    return maskNode;
};

实现拖拽
var drag = function (node) {
	var dragNode = getNode(node);
	//鼠标点击下时计算与client的距离
	dragNode.onmousedown = function(event) {
		var clientDis = {
			offsetL: dragNode.offsetLeft,
        	offsetT: dragNode.offsetTop,
        	clientX: event.clientX,
        	clientY: event.clientY
		}
        return clientDis;
	};

	//鼠标移动时与client的距离
	dragNode.onmousemove = function(event) {
        
        var dis = {
        	disX: (moveDis.clientX >= clientDis.offsetL) ? event.clientX : clientDis.offsetL ,
        	disY: (moveDis.clientY >= clientDis.offsetT) ? event.clientY : clientDis.offsetT
        };
        return dis;
	};

	//设置距离
	dragNode.style.left = dis.disX +'px';
	dragNode.style.top = dis.disY +'px';
}
getNode('#mask-btn').addEventListener('click', maskChange('.mask-hidden', 'mask-show'), false);
getNode('#quik').addEventListener('click', maskChange('.mask-show', 'mask-hidden'), false);

