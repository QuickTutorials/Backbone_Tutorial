var datos = { 
		name:"Roclas",
		email:"carlos@roclas.com",
		items:{
		"Item 1":1,
		"Item 2":1,
		"Folder 1":{
			"Sub Item 1.1":1,
			"Sub Item 1.2":1
		},
		"Item 3":1,
		"Folder 2":{
			"Sub Item 2.1":1,
			"Folder 2.1":{
				"Sub Item 2.1.1":1,
				"Sub Item 2.1.2":1,
				"Folder 2.1.1":{
					"Sub Item 2.1.1.1":1
				}
			}
		},
		"Item 4":1
		}
};

(function($){

  var TreeModel = Backbone.Model.extend({defaults: {name: "Nombre", email: "Direccion email"}});      

  var TreeView = Backbone.View.extend({
    events: {
      'click li.submenu': 'toogleFolder'
    },

    initialize: function(){
      _.bindAll(this, 'render');
      
      this.render();      
    },

    toogleFolder: function(i,e){
			i.stopPropagation();
			var myclass=i.srcElement.className;
			var myselector="li."+myclass.replace(/ /g,".");
			var display=$(myselector+">ul",this.el).css("display");
			if(display=="none"){
				$(myselector+">ul",this.el).css({"display":"block"});
				$(myselector,this.el).attr("class", myclass.replace("closed","open"));
			}else{
				$(myselector+">ul",this.el).css({"display":"none"});
				$(myselector,this.el).attr("class", myclass.replace("open","closed"));
			}
    },

    template: _.template($("#template-tree").html()),

    render: function() {
    		var dict = this.model.toJSON();
    		var html = this.template(dict);
    		this.el.html(html);
    }

  });

  var myModel = new TreeModel(datos);
  var myTreeView = new TreeView({el:$('#tree1'), model:myModel});

})(jQuery);

