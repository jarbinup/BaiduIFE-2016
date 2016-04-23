window.onload = function () {

    var inputBox = document.querySelector("#input-box");
    var buttonIn = document.querySelector("#button-in");
    var buttonOut = document.querySelector("#button-out");
    var showArea = document.querySelector(".showarea");
    var sort =  document.querySelector("#sort");
    var randomData =  document.querySelector("#random-data");
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

        this.items = function () {
            return items;
        }

        this.render = function () {
             showArea.innerHTML = items.map(function(i) { 
                 return '<li style="height:' +parseInt(i)*4+ 'px;background:rgb(' +randomRGB()+ ',' +randomRGB()+ ',' +randomRGB()+ ')"></li>'; 
             }).join('');
        };

        this.clickOut = function (event) {
            var target = event.target;
            var i = items.indexOf(target);
            sq.removeOut(i);
            showArea.removeChild(target);
        }

    }

    

    //随机颜色
    function randomRGB () {
        return Math.floor(Math.random() * 255);
    }

    //检查输入
    function checkInput (event) {
        var patt =  /^[0-9]+$/g;
        var inputValue = inputBox.value.trim();
        target = event.target;
        if(patt.test(inputValue) && inputValue >= 10 && inputValue <= 100) {
            console.log("输入的值是" + inputValue);
            selectIn(target, inputValue);
        }
        else{
            alert("只能输入10-100之间的正整数");
        }
    }
    
    //点击左侧入和右侧入的事件处理函数
    function selectIn (target, inputValue) {
        var opt = target.getAttribute("name");
        console.log("点击了" + opt);
        if(sq.size() <= 60) {
            sq[opt](inputValue);
            sq.print();
            sq.render();
        } else {
            alert("队列元素已超过60个");
        }
    }
    
    //点击左侧出和右侧出的事件处理函数
    function selectOut () {
        var target = event.target;
        var opt = target.getAttribute("name");
        console.log("点击了" + opt);
        sq[opt]();
        sq.print();
        sq.render();
    }  
    
    //排序
    function ensort () {
        function compare(a, b) {
            if(a > b) {
                return 1;
            }
            if(a < b) {
                return -1;
            }
                return 0;
        }

        sq.items().sort(compare);
        sq.render();
    }
    
    //随即生成20个数
    function generator() {
        var ele = function() {
            return Math.floor(Math.random() * 100);
        };
        for(var i = 0; i < 20; i++) {
            sq.rightIn(ele());
            ele();
            console.log("打印随机数："+ sq.items())
        }

        sq.render();
    }


    buttonIn.addEventListener("click", checkInput, false);
    buttonOut.addEventListener("click", selectOut, false);
    showArea.addEventListener("click", sq.clickOut, false);   
    sort.addEventListener("click", ensort, false); 
    randomData.addEventListener("click", generator, false);

}