var Item = Backbone.Model.extend({
  defaults: {
    name:'Nombre por defecto',
    email: 'adsfasdf@asfas.com',
    address: 'my address, madrid, Spain',
    job: 'computer freak'
  }
});      

var ExampleView = Backbone.View.extend({
  events: {
    'click td'  : 'alertaCelda',
    'click th'  : 'alertaCabecera'
  },

  initialize: function(){
    _.bindAll(this, 'render');
    this.model = new Item();
    this.model.bind('change', this.render);
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
  },

  alertaCabecera: function(){
    alert("Has pulsado en la cabecera de la tabla");
  },

  alertaCelda: function(ev){
    var contenido = $(ev.currentTarget).html();
    alert("Has pulsado en una celda de la tabla con contenido: " + contenido );
  }
});

var myview = new ExampleView({el:$('#myelement')});