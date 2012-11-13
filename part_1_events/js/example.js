var AAA;
(function($){ //anonymous function (parenthesys)
  var Item = Backbone.Model.extend({
    defaults: {
      name:'',
      email: 'adsfasdf@asfas.com',
      address: 'my address, madrid, Spain',
      job: 'computer freak'
    }
  });      
  
  var ExampleView = Backbone.View.extend({
    //el: $('#myelement'),
    events: {
      'click td':'alerta',
      'click th':'alertb'
    },
    initialize: function(){
      _.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here
      this.model= new Item();
      this.model.bind('change', this.render); //this.model.set({name:"bbbbbbbbbb"}) will trigger a render event
      this.render();      
    },
    render: function(){
      var self = this;      
      $(this.el).empty();
      var tablescaffold="<div>";
      tablescaffold+="<table style='min-width:100%;'><thead>";
      tablescaffold+="<th>Element</th>";
      tablescaffold+="</thead><tbody>";
      _.each(this.model.attributes,function(el){
      	tablescaffold+="<tr><td>";
      	tablescaffold+=el;
      	tablescaffold+="</td></tr>";
      });
      tablescaffold+="</tbody></table>";
      $(this.el).html(tablescaffold);
      return this;
    },
    alerta: function(){ alert("A"); },
    alertb: function(){ alert("B"); }
  });



  //var cargarParticipantes=function(collection){ };

  var myview = new ExampleView({el:$('#myelement')});
  AAA=myview;
  //myview.reCargarParticipantes();
  //cargarParticipantes();

})(jQuery);

