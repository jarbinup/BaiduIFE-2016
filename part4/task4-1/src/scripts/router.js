function Router() {
	this.routes = {};
	this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
	this.routes[path] = callback || function(){};
};

Router.prototype.refresh = function() {
	this.currentUrl = location.hash.slice(1) || '/';
	this.routes[this.currentUrl]();
};

Router.prototype.init = function() {
	window.addEventListener('load', this.refresh.bind(this), false);
	window.addEventListener('hashchange', this.refresh.bind(this), false);
}
  
window.Router = new Router();
window.Router.init();
console.log(Router.routes);

var	cQ = document.querySelector('#create-ques'),
    eQ = document.querySelector('#edit-ques'),
    pQ = document.querySelector('#pro-ques'),
    Log = document.querySelector('#logo'),
    per = document.querySelector('#per-ques');

Router.route('/', function() {
	Log.onclick = function() {
		cQ.setAttribute("class","display-show");
		eQ.setAttribute("class","display-hidden");
		pQ.setAttribute("class","display-hidden");	
    }
});
Router.route('/list', function() {
   per.onclick = function() {
		cQ.setAttribute("class","display-hidden");
		eQ.setAttribute("class","display-hidden");
		pQ.setAttribute("class","display-show");	
    }
});
Router.route('/edit', function() {
	cQ.onclick = function() {
		cQ.setAttribute("class","display-hidden");
		eQ.setAttribute("class","display-show");
		pQ.setAttribute("class","display-hidden");	
    }
});
