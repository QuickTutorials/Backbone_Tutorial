var Item = Backbone.Model.extend({
  defaults: {
    checked: false,
    nombre:'-- Sin nombre --',
    position:0,
  }
});      

// **List class**: A collection of `Item`s. Basically an array of Model objects with some helper functions.
var List = Backbone.Collection.extend({ model: Item });

var ListView = Backbone.View.extend({
  events: {
    'click input.addnew': 'addItem',
    'click button#clean': 'clean',
    'keyup input':'keyup_input',
    'click td input[type="checkbox"]':'checkone',
    'click th input[type="checkbox"]':'checkall',
    'click td.editar>span.nombre':'editar',
    'blur td.editar input':'guardar_edicion',
    'click td.borrar':'borrar',
    'click td.abajo':'abajo',
    'click td.arriba':'arriba',
    'click #delete_checks':'delete_checked',
    'click #up_checks':'moveup_checked',
    'click #down_checks':'movedown_checked',
  },

  initialize: function(){
    _.bindAll(this, 'render', 'addItem'); // remember: every function that uses 'this' as the current object should be in here
    
    this.collection = new List();
    this.collection.bind('add', this.render); // collection event binder
    this.counter = 0;

    this.render();      
  },

  render: function(){
    $(this.el).empty();

    var tablescaffold = "<table style='min-width:100%;'><thead>";
    tablescaffold += "<th class='tpartheader'><input type='checkbox' /></th>";
    tablescaffold += "<th colspan='5' class='tpartheader' style='width:20em;'>Opciones</th>";
    tablescaffold += "</thead><tbody></tbody></table>";
    tablescaffold += "<div class='controles'>";
    tablescaffold += "<span><img src='img/select.png' /></span>";
    tablescaffold += "<span><img id='delete_checks' src='img/delete.png' /></span>";
    tablescaffold += "<span><img id='up_checks' src='img/up.png' /></span>";
    tablescaffold += "<span><img id='down_checks' src='img/down.png' /></span>";
    tablescaffold += "<span> <input type='button' value='Nuevo' class='addnew'></span>";
    tablescaffold += "</div>";
    $(this.el).append(tablescaffold);

    _(this.collection.models).each(function(item){ 
      var tablecontent = "<tr>";
      tablecontent += "<td class='seleccion'><input type='checkbox' id='check_particip_"+item.attributes.position+"' "+(item.get('checked')?"checked":"")+" /></td>";
      tablecontent += "<td class='editar'><span class='nombre' id='nombre_part_"+item.attributes.position+"' >"+item.get('nombre')+"</span></td>";
      tablecontent += "<td class='borrar' id='borrar_part_"+item.attributes.position+"' >&nbsp;</td>";
      tablecontent += "<td class='arriba' id='arriba_part_"+item.attributes.position+"' >&nbsp;</td>";
      tablecontent += "<td class='abajo' id='abajo_part_"+item.attributes.position+"' >&nbsp;</td>";
      tablecontent += "<td class='posicion' id='position_part_"+item.attributes.position+"' >"+item.attributes.position+"</td>";
      tablecontent += "</tr>";
    	$('tbody', this.el).append(tablecontent);
    }, this);

    if(!this.collection.models.length){
    	$(this.el).append("<div style='position:absolute;margin:6em;'><br />A&uacute;n no hay nada. Simplemente crea nuevas opciones</div>");
    }
  },

  checkallChecked: false,
  
  checkall: function(){
    var self=this;
  	this.checkallChecked=this.checkallChecked?false:true;
    this.collection.each(function(e){e.attributes.checked=self.checkallChecked;});
    this.render();
    if(this.checkallChecked) {
      $("th input[type='checkbox']",this.el).attr("checked","checked");
    }
  },

  checkone: function(){
    this.collection.each(function(e){
      e.attributes.checked=$("#check_particip_"+e.attributes.position)[0].checked;
    });
  },

  moveup_checked: function(){ 
    var self=this;
    _.each(self.collection._byCid,function(e){ 
		  if(e.attributes.checked){ self.moveup_element(e); }
  	}); 
  },

  movedown_checked: function(){ 
    var self=this;
    var list=_.toArray(self.collection._byCid).reverse();
    _.each(list,function(e){ 
		  if(e.attributes.checked){
        self.movedown_element(e);
      }
  	}); 
  },

  moveup_element: function(e){
    var index=e.attributes.position;
    if(index>0){
  		var elems=_.map(this.collection._byCid,function(i){return i});
  		var abajo=this.collection.getByCid(elems[index].cid);
  		var arriba=this.collection.getByCid(elems[index-1].cid);
  		abajo.attributes.position=parseInt(index-1);
  		arriba.attributes.position=parseInt(index);
  		this.sortByPosition();
    }
  },

  movedown_element: function(e){
    var index=e.attributes.position;
    if(index<this.collection.length-1){
  		var elems=_.map(this.collection._byCid,function(i){return i});
  		var arriba=this.collection.getByCid(elems[index].cid);
  		var abajo=this.collection.getByCid(elems[index+1].cid);
  		arriba.attributes.position=parseInt(index+1);
  		abajo.attributes.position=parseInt(index);
  		this.sortByPosition();
  	}
  },

  editar: function(e){
    var self=this;
    if(this.guardar_todo()) {
      this.render()
    };
    var cid = e.target.id.replace(/^nombre_part_/,"");
    var current=$("#nombre_part_"+cid,this.el).html();
    $("#nombre_part_"+cid, this.el).html('<input style="width:100%;height:100%;margin:0px;padding:0px;position:relative;" type="text" value="'+current+'" />');
    $("#nombre_part_"+cid, this.el).attr("class","guardar");
    $("#nombre_part_"+cid, this.el).attr("id","guardar_part_"+cid);
    $("#guardar_part_"+cid+" input",this.el).focus();
  },

  escritura: function(event){
    console.debug(event);
  },

  guardar_edicion: function(){
    this.guardar_todo();
    this.render();
  },

  guardar_todo: function(){
    var self=this;;
    var render=false;
    var self=this;
    $('.guardar', this.el).each(function(i,elem){
    	var index= elem.id.replace(/^guardar_part_/,"");
    	var elems=_.map(self.collection._byCid,function(i){return i});
    	var elem=self.collection.getByCid(elems[index].cid);
    	self.guardar(elem);
    	render=true;
    });
    return render;
  },

  guardar:function(a){
    var position=a.attributes.position;
    var nombre=$("#guardar_part_"+position+">input").val();
    a.attributes.nombre=nombre;
    $("#guardar_part_"+position, this.el).attr("class","nombre");
  },

  borrar: function(e){
  	var index = parseInt(e.target.id.replace(/^borrar_part_/,""));
  	var elems=_.map(this.collection._byCid,function(i){return i});
  	var elem=elems[index];
  	this.collection.remove(elem);
  	this.reCargarParticipantes(this.collection);
  },

  delete_checked: function(){ 
  	var self=this;
  	_.each(self.collection._byCid,function(e){
  		if(e.attributes.checked){ 
  			self.collection.remove(e); 
  		}
    }); 
  	this.reCargarParticipantes(this.collection);
  },

  save: function(){
    var attributes=["nombre","email","id"];
    var participantes=this.collection.map(function(e,i){ 
    	var elem={};
    	$.each(attributes,function(a,b){ elem[b]=e["attributes"][b]; });
    	return elem;
    });
    var params={"model":{"id":$("#id").val()},"Participante":participantes};
    $.post('http://mysite.com/blabla/salvar/222',params, function(data) {
    	//console.debug("resultado = ", data);
    });
  },

  clean: function(){
    this.collection.refresh();
    this.render();
  },

  addItem: function(attributes){
    if(!attributes)attributes={};
    attributes.position=this.counter++;
    var item = new Item();
    item.set(attributes);
    this.collection.add(item); // add item to collection; view is updated via event 'add'
  },

  sortByPositionDesc: (-1),

  sortByPosition: function(){ 
    this.reCargarParticipantes(this.collection); 
  },

  reCargarParticipantes:function(collection){
    if(collection){
    	var self=this;
    	var arr_attributes_desordenado=_.map(self.collection._byCid,function(i){return i.attributes});
    	var arr_attributes=[];
    	_.each(arr_attributes_desordenado,function(el){arr_attributes[el.position]=el});
          	self.collection._reset();
    	self.counter=0;
    	_.each(arr_attributes,function(i){self.addItem(i)});
          	self.render();
    }else{
    	this.addItem();
    	this.addItem();
    	this.addItem();
    }
  },

  arriba: function(e){
  	var index= parseInt(e.target.id.replace(/^arriba_part_/,""));
  	if(index>0){
  		var elems=_.map(this.collection._byCid,function(i){return i});
  		var e=this.collection.getByCid(elems[index].cid);
  		this.moveup_element(e);
  	}
  },

  abajo: function(e){
  	var index= parseInt(e.target.id.replace(/^abajo_part_/,""));
  	if(index<(this.collection.size()-1)){
  		var elems=_.map(this.collection._byCid,function(i){return i});
  		var arriba=this.collection.getByCid(elems[index].cid);
  		var abajo=this.collection.getByCid(elems[index+1].cid);
  		abajo.attributes.position=parseInt(index);
  		arriba.attributes.position=parseInt(index+1);
  	}
  	this.sortByPosition();
  },

  keyup_input:function(e) {
    var self=this;
    if(e.keyCode == 13) {
      self.guardar_edicion();
    } 
  }
});

var listView = new ListView({el:$('#tablaparticipantes')});
var listView2 = new ListView({el:$('#tablaparticipantes2')});
listView.reCargarParticipantes();
listView2.reCargarParticipantes();

