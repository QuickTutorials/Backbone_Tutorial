var Item = Backbone.Model.extend({
  defaults: {
    name:'elemento',
    email: 'adsfasdf@asfas.com',
    address: 'my address, madrid, Spain',
    job: 'computer freak'
  }
});      

var ExampleView = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here
    this.model.bind('change', this.render); //this.model.set({name:"bbbbbbbbbb"}) will trigger a render event
    this.render();      
  },

  render: function(){
    $(this.el).empty();
    var tablescaffold = "<table style='min-width:100%;'><thead><th colspan='2'>"+this.model.get("name")+"</th></thead><tbody>";
    _.each(this.model.attributes, function(value, key) {
    	tablescaffold += "<tr>";
    	tablescaffold += "<td>"+key+"</td>";
    	tablescaffold += "<td>"+value+"</td>";
    	tablescaffold += "</tr>";
    });
    tablescaffold += "</tbody></table>";
    $(this.el).html(tablescaffold);

    return this;
  }
});

var myview = new ExampleView({el:$('#myelement'),model:new Item({name:"element I"})});
var myview2 = new ExampleView({el:$('#myelement2'),model:new Item({name:"element II"})});

/* Eventos de consola */
$('#ejecutar').click(function() {
  var instruccion = $('#entrada').val();
  eval(instruccion);
});