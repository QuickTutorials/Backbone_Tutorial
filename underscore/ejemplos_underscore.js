var salida;

/* Colecciones */
$('#ejecutar_each_array').click(function() {
	salida = '';
	
	_.each([1, 2, 3], function(element, index) {
	  salida = salida + (index + ': ' + element) + '\n';
	});
	
	$('#salida').val(salida);
});

$('#ejecutar_each_objeto').click(function() {
	salida = '';
	
	_.each({one : 1, two : 2, three : 3}, function(value, key) {
	  salida = salida + (key + ': ' + value) + '\n';
	});
	
	$('#salida').val(salida);
});

$('#ejecutar_map_array').click(function() {
	salida = _.map([1, 2, 3], function(num){ return num * 3; });
	
	$('#salida').val(salida);
});

$('#ejecutar_map_objeto').click(function() {
	salida = _.map({four : 4, five : 5, six : 6}, function(num, key){ return num * 3; });
	
	$('#salida').val(salida);
});

$('#ejecutar_reduce').click(function() {
	salida = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
	
	$('#salida').val(salida);
});

$('#ejecutar_find').click(function() {
	salida = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
	
	$('#salida').val(salida);
});

$('#ejecutar_filter').click(function() {
	salida = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
	
	$('#salida').val(salida);
});

$('#ejecutar_contains').click(function() {
	salida = _.contains([1, 2, 3], 3);
	
	$('#salida').val(salida);
});

$('#ejecutar_pluck').click(function() {
	var clients = [{name : 'moe', age : 40}, {name : 'larry', age : 50}, {name : 'curly', age : 60}];
	salida = _.pluck(clients, 'name');
	
	$('#salida').val(salida);
});

$('#ejecutar_max').click(function() {
	var clients = [{name : 'moe', age : 40}, {name : 'larry', age : 50}, {name : 'curly', age : 60}];
	salida = _.max(clients, function(client){ return client.age; });
	
	$('#salida').val('name: ' + salida.name + '\nage: ' + salida.age);
});

$('#ejecutar_min').click(function() {
	var numbers = [10, 5, 100, 2, 1000];
	salida = _.min(numbers);
	
	$('#salida').val(salida);
});

/* Arrays */
$('#ejecutar_compact').click(function() {
	salida = _.compact([0, 1, false, 2, '', 3]);
	
	$('#salida').val(salida);
});

$('#ejecutar_without').click(function() {
	salida = _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	
	$('#salida').val(salida);
});

$('#ejecutar_union').click(function() {
	salida = _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
		
	$('#salida').val(salida);
});

$('#ejecutar_intersection').click(function() {
	salida = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	
	$('#salida').val(salida);
});

$('#ejecutar_difference').click(function() {
	salida = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
		
	$('#salida').val(salida);
});

$('#ejecutar_uniq').click(function() {
	salida = _.uniq([1, 2, 1, 3, 1, 4]);
	
	$('#salida').val(salida);
});

$('#ejecutar_zip').click(function() {
	salida = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
	
	$('#salida').val(salida[0] + '\n' + salida[1] + '\n' + salida[2]);
});

$('#ejecutar_range').click(function() {
	salida = _.range(10);
		
	$('#salida').val(salida);
});

$('#ejecutar_range_indice').click(function() {
	salida = _.range(1, 11);
	
	$('#salida').val(salida);
});

$('#ejecutar_range_paso').click(function() {
	salida = _.range(0, 30, 5);
		
	$('#salida').val(salida);
});

$('#ejecutar_range_negativo').click(function() {
	salida = _.range(0, -10, -1);
		
	$('#salida').val(salida);
});

/* Funciones */
$('#ejecutar_bind').click(function() {
	var func = function(greeting){ 
		salida = greeting + ': ' + this.name 
	};
	var func_bind = _.bind(func, {name : 'moe'}, 'hi');
	func_bind();
		
	$('#salida').val(salida);
});

$('#ejecutar_bind_parametros').click(function() {
	var func = function(greeting){ 
		salida = greeting + ': ' + this.name 
	};
	var func_bind = _.bind(func, {name : 'moe'});
	func_bind('hola');
		
	$('#salida').val(salida);
});

$('#ejecutar_delay').click(function() {
	var func = function() {
	  salida = 'Retraso de 2 segundos';
		$('#salida').val(salida);
	}
	_.delay(func, 2000);
});

$('#ejecutar_keys').click(function() {
	salida = _.keys({one : 1, two : 2, three : 3});
	
	$('#salida').val(salida);
});

$('#ejecutar_values').click(function() {
	salida = _.values({one : 1, two : 2, three : 3});
	
	$('#salida').val(salida);
});

$('#ejecutar_functions').click(function() {
	salida = _.functions(_);
	
	$('#salida').val(salida);
});

$('#ejecutar_extend').click(function() {
	salida = _.extend({name : 'moe'}, {age: 50, userid : 'moe1'});
	
	$('#salida').val('')
	_.each(salida, function(value, key) {
		$('#salida').val($('#salida').val() + key + ' : ' + value + '\n');
	});
});

$('#ejecutar_pick').click(function() {
	salida = _.pick({name : 'moe', age: 50, userid : 'moe1'}, 'name', 'age');
	
	$('#salida').val('')
	_.each(salida, function(value, key) {
		$('#salida').val($('#salida').val() + key + ' : ' + value + '\n');
	});
});

$('#ejecutar_omit').click(function() {
	salida = _.omit({name : 'moe', age : 50, userid : 'moe1'}, 'age');
	
	$('#salida').val('')
	_.each(salida, function(value, key) {
		$('#salida').val($('#salida').val() + key + ' : ' + value + '\n');
	});
});

$('#ejecutar_defaults').click(function() {
	var iceCream = {flavor : "chocolate"};
	salida = _.defaults(iceCream, {flavor : "vanilla", sprinkles : "lots"});
	
	$('#salida').val('')
	_.each(salida, function(value, key) {
		$('#salida').val($('#salida').val() + key + ' : ' + value + '\n');
	});
});

$('#ejecutar_isEqual').click(function() {
	var moe   = {name : 'moe', luckyNumbers : [13, 27, 34]};
	var clone = {name : 'moe', luckyNumbers : [13, 27, 34]};
	
	var igual = (moe == clone);
	var equal = _.isEqual(moe, clone);
	$('#salida').val('moe == clone : ' + igual + '\n' + '_.isEqual(moe, clone) : ' + equal);
});

/* Utilidades */
$('#ejecutar_mixin').click(function() {
	_.mixin({
    capitalize : function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
	});
	salida = _('fabio').capitalize();
	
	$('#salida').val(salida);
});

$('#ejecutar_escape').click(function() {
	salida = _.escape('Curly, Larry & Moe');
	$('#salida').val(salida);
});

$('#ejecutar_unescape').click(function() {
	salida = _.unescape('Curly, Larry &amp; Moe');
	
	$('#salida').val(salida);
});

$('#ejecutar_result').click(function() {
	var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
	var propiedad = _.result(object, 'cheese');
	var funcion = _.result(object, 'stuff');
	
	$('#salida').val('propiedad : ' + propiedad + '\n' + 'función : ' + funcion);
});

$('#ejecutar_template').click(function() {
	var compiled = _.template("hello: <%= name %>");
  salida = compiled({name : 'moe'});

	$('#salida').val(salida);
});