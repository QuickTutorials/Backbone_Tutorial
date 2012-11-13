  var Item = Backbone.Model.extend({
    defaults: {
      name:'elemento',
      email: 'adsfasdf@asfas.com',
      address: 'my address, madrid, Spain',
      job: 'computer freak'
    }
  });      
  
  var ExampleView = Backbone.View.extend({
    //el: $('#myelement'),
    initialize: function(){
      _.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here
      //this.model= new Item(); //can be done outside or inside
      this.model.bind('change', this.render); //this.model.set({name:"bbbbbbbbbb"}) will trigger a render event
      this.render();      
    },
    render: function(){
      var self = this;      
      $(this.el).empty();
      var tablescaffold="<div>";
      tablescaffold+="<table style='min-width:100%;'><thead>";
      tablescaffold+="<th>"+this.model.get("name")+"</th>";
      tablescaffold+="<th></th>";
      tablescaffold+="</thead><tbody>";
      _.each(this.model.attributes,function(i,e){
      	tablescaffold+="<tr>";
      	tablescaffold+="<td>"+e+"</td>";
      	tablescaffold+="<td>"+i+"</td>";
      	tablescaffold+="</tr>";
      });
      tablescaffold+="</tbody></table>";
      $(this.el).html(tablescaffold);
      return this;
    }
  });



  //var cargarParticipantes=function(collection){ };

  var myview = new ExampleView({el:$('#myelement'),model:new Item({name:"element I"})});
  var myview2 = new ExampleView({el:$('#myelement2'),model:new Item({name:"element II"})});


