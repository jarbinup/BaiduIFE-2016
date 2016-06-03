var getNode = function (ele) {
    return document.querySelector(ele);
};

var addBtn = getNode('.add-btn');
var count = 1;
console.log(addBtn);
addBtn.onclick = function(){
	count++;
	if(count%2 == 0) {
		getNode('.type').style.display = 'none';
		addBtn.style.borderTop = '1px solid #cbcbcb';
	} else{
		getNode('.type').style.display = 'block';
		addBtn.style.borderTop = 'none';
	}
	console.log(count);
}