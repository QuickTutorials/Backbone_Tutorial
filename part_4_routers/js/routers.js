var AppRouter = Backbone.Router.extend({
  routes: {
    "tree/:id": "paintTree",
    "*actions": "defaultRoute" // matches http://example.com/#anything-here
  }
});

// Initiate the router
var app_router = new AppRouter;

var myModel = new TreeModel(datos);

app_router.on('route:paintTree', function(id) {
	$("td").html("");
	try{ 
  	var treeView = new TreeView({el:$('#'+id), model:myModel});
	}catch(err){}
})

app_router.on('route:defaultRoute', function(actions) {
	$("td").html("");
	try{
		if (actions && actions != '') {
			alert("your route is: " + actions);
		}
	}catch(err){}
})

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();