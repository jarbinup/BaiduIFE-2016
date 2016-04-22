window.onload = function () {

    var inputBox = document.querySelector("#input-box");
    var buttonIn = document.querySelector("#button-in");
    var buttonOut = document.querySelector("#button-out");
    var showArea = document.querySelector(".showarea");
    var sq = new stackqueue();

    //定义一个队列和堆栈
    function stackqueue () {
        var items = [];

        this.leftIn = function (element) {
            items.unshift(element);
        };
        
        this.rightIn = function (element) {
            items.push(element);
        };

        this.leftOut = function () {
            items.shift();
        };

        this.rightOut = function () {
            items.pop();
        };

        this.removeOut = function (pos) {
            items.splice(pos, 1);
        };

        this.isEmpty = function () {
            return items.length == 0;
        }

        this.size = function () {
            return items.length;
        };

        this.print = function () {
            console.log(items.toString());
        };

        this.clickOut = function (event) {
            var target = event.target;
            var i = items.indexOf(target);
            sq.removeOut(i);
            showArea.removeChild(target);
        }

        this.render = function () {
             showArea.innerHTML = items.map(function(i) { 
                 return '<li style="background:rgb(' +randomRGB()+ ',' +randomRGB()+ ',' +randomRGB()+ ')">' + i + '</li>'; 
             }).join('');
         }

    }

    

    //随机颜色
    function randomRGB () {
        return Math.floor(Math.random() * 255);
    }

    //检查输入
    function checkInput (event) {
        var patt =  /^\d{1,}$/g;
        var inputValue = inputBox.value.trim();
        target = event.target;
        if(patt.test(inputValue)) {
            console.log("输入的值是" + inputValue);
            selectIn(target, inputValue);
        }
        else{
            alert("只能输入数字");
        }
    }

    function selectIn (target, inputValue) {
        var opt = target.getAttribute("name");
        console.log("点击了" + opt);
        sq[opt](inputValue);
        sq.print();
        sq.render();
    }

    function selectOut () {
        var target = event.target;
        var opt = target.getAttribute("name");
        console.log("点击了" + opt);
        sq[opt]();
        sq.print();
        sq.render();
    }

    

    buttonIn.addEventListener("click", checkInput, false);
    buttonOut.addEventListener("click", selectOut, false);
    showArea.addEventListener("click", sq.clickOut, false);    


}