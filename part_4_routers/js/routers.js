var AppRouter = Backbone.Router.extend({
        routes: {
            "tree/:id": "paintTree",
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        }
});
// Initiate the router
var app_router = new AppRouter;

var mymodel=new TreeModel(data0);
app_router.on('route:paintTree', function(id) {
	$("td").html("");
	try{ 
	//var mymodel=new TreeModel(data0);
  	var treeView = new TreeView({el:$('#'+id),model:mymodel});
	}catch(err){}
})
app_router.on('route:defaultRoute', function(actions) {
	try{ alert("your route is: "+actions);
	}catch(err){}
})

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
