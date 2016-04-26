window.onload = function () {

    var inputBox = document.querySelector("#input-box");
    var buttonIn = document.querySelector("#button-in");
    var searchBtn = document.querySelector("#search-btn");
    var searchBox = document.querySelector("#search-box");
    var showArea = document.querySelector(".showarea");
    var add = document.querySelector("#add");
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
                 return '<li style="padding:10px;background:rgb(' +randomRGB()+ ',' +randomRGB()+ ',' +randomRGB()+ ')">'+i+'</li>'; 
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

    //add处理函数
    function checkInput (event) {
        var inputValue = inputBox.value.trim();
        target = event.target;

        var pattValue = inputValue.split(/\W+/);
        console.log("转化后的值是" + pattValue);

        for(let i = 0; i < pattValue.length; i++) {
            var item = sq.items();
            item[i] = pattValue[i];
        }

        sq.render();        
    }

    //查询处理函数
    function checkSearch (argument) {
        var searchInput = searchBox.value.trim();
        console.log(searchInput);
        var searchPatt = new RegExp(searchInput, "g");
        showArea.innerHTML = sq.items().map(function(i) { 
            if (searchInput != null && searchInput.length > 0) {
                i = i.replace(new RegExp(searchInput, "g"), '<strong style="background:red">'+searchInput+'</strong>')
            }
            return '<li style="padding:10px;background:rgb(' +randomRGB()+ ',' +randomRGB()+ ',' +randomRGB()+ ')">' +i+ '</li>'; 
        }).join('');
    }  
       

    buttonIn.addEventListener("click", checkInput, false);
    showArea.addEventListener("click", sq.clickOut, false);
    searchBtn.addEventListener("click", checkSearch, false);   

}