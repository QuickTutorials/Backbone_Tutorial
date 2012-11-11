var AAA;

var data0={ 
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

(function($){ //anonymous function (parenthesys)

  var TreeModel= Backbone.Model.extend({ defaults: { nombre:'-', email: 'adsfasdf@asfas.com' } });      

  var TreeView = Backbone.View.extend({
    //el: $('#tablaparticipantes'),
    events: {
      'click li.submenu': 'toogleFolder'
    },

    initialize: function(){
      _.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here
      //this.model = new TreeModel(data0);
      this.render();      
    },
    toogleFolder:function(i,e){
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
    		$(this.el).html(html);
    }

  });

  var mymodel=new TreeModel(data0);
  var treeView = new TreeView({el:$('#tree1'),model:mymodel});

})(jQuery);

