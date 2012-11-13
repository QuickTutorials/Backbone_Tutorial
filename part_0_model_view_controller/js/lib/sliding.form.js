$(function() {
	/*
	number of fieldsets
	*/
	var fieldsetCount = $('#formElem').children().length;
	
	/*
	current position of fieldset / navigation link
	*/
	var current 	= 1;
    
	/*
	sum and save the widths of each one of the fieldsets
	set the final sum as the total width of the steps element
	*/
	var stepsWidth	= 0;
    	var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
	widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
	
	/*
	to avoid problems in IE, focus the first input of the form
	*/
	$('#formElem').children(':first').find(':input:first').focus();	
	
	/*
	show the navigation bar
	*/
	$('#navigation').show();
	
	/*
	when clicking on a navigation link 
	the form slides to the corresponding fieldset
	*/
    $('#navigation a').bind('click',function(e){
		var $this	= $(this);
		var prev	= current;
		if(current+1==widths.length){
			var campos={};
			$("input").each(function(i,e){campos[e.name]=e.value;});
			$.post('http://www.porreros.com/porras/validar_datos',campos, function(data) {
				var mensaje="";
				if(!data.ok){
				  mensaje+="Los siguientes campos son incorrectos:<br />";
				  if(!data.validates){
					for(i in data.invalidFields){
						mensaje+="<br /><strong style='color:red;'>"+i+":</strong> "+data.invalidFields[i];
					}
				  }
				  if(!data.captchaok){
					mensaje+="<br /><strong style='color:red;'>código de validación (catpcha):</strong> está mal";
				  }
				  mensaje+="<br /><br />";
				  mensaje+="Vuelve al paso anterior y rellénalos correctamente";
				  $("#submit [type=submit]").hide();
				  $("#submit .noticias")[0].innerHTML=$(".previous")[0].innerHTML; 
				  $("#submit .noticias")[0].innerHTML+=" <strong style='color:red;'>no podrás confirmar tus datos hasta que no corrijas los errores</strong>"; 
				  $("#submit .noticias").click(function(){$(".previous").click();});
				}else{
				  	$("#submit .noticias")[0].innerHTML="";
				  	$("#submit .noticias").append("<input title='Escribe aquí el código que has recibido en el email' id='confirmacion' name='confirmacion' type='text' AUTOCOMPLETE=OFF />");
					$('input').tooltip();
				  	$("#submit .noticias").unbind("click");
					mensaje+="datos correctos, comprueba que te haya llegado el mail de confirmación (mira también en tu carpeta de spam si no lo encuentras en tu bandeja de entrada) escribe a continuación el código de verificación de 4 caracteres que allí se te indica y dale al botón de confirmar";
				  	$("#submit [type=submit]").show();
				}
				$("#mensajesalta")[0].innerHTML=mensaje;
			});
		}
		$this.closest('ul').find('li').removeClass('selected');
        	$this.parent().addClass('selected');
		current = $this.parent().index() + 1;
		if(current == fieldsetCount) validateSteps();
		else validateStep(prev);
		/*
		if($('#formElem').data('errors')){
			alert("Por favor, rellena todos los datos para poder continuar");
			return;
		}
		*/
		$('#steps').stop().animate({ marginLeft: '-' + widths[current-1] + 'px' },500,function(){
			$('#formElem').children(':nth-child('+ parseInt(current) +')').find(':input:first').focus();	
		});
		currentstep=current;
        	//e.preventDefault();
    });
	
	/*
	clicking on the tab (on the last input of each fieldset), makes the form
	slide to the next step
	*/
	$('#formElem > fieldset').each(function(){
		var $fieldset = $(this);
		$fieldset.children(':last').find(':input').keydown(function(e){
			if (e.which == 9){
				$('#navigation li:nth-child(' + (parseInt(current)+1) + ') a').click();
				/* force the blur for validation */
				$(this).blur();
				e.preventDefault();
			}
		});
	});
	
	/*
	validates errors on all the fieldsets
	records if the Form has errors in $('#formElem').data()
	*/
	function validateSteps(){
		var FormErrors = false;
		for(var i = 1; i < fieldsetCount; ++i){
			var error = validateStep(i);
			if(error == -1) FormErrors = true;
		}
		$('#formElem').data('errors',FormErrors);	
	}
	
	/*
	validates one fieldset
	and returns -1 if errors found, or 1 if not
	*/
	function validateStep(step){
		if(step == fieldsetCount) return;
		
		var error = 1;
		var hasError = false;
		$('#formElem').children(':nth-child('+ parseInt(step) +')').find(':input:not(button)').each(function(){
			var $this 		= $(this);
			var valueLength = jQuery.trim($this.val()).length;
			
			if(valueLength == ''){
				hasError = true;
				$this.css('background-color','#FFEDEF');
			}
			else
				$this.css('background-color','#FFFFFF');	
		});
		var $link = $('#navigation li:nth-child(' + parseInt(step) + ') a');
		$link.parent().find('.error,.checked').remove();
		
		var valclass = 'checked';
		if(hasError){
			error = -1;
			valclass = 'error';
		}
		$('<span class="'+valclass+'"></span>').insertAfter($link);
		
		return error;
	}

	$('.next').bind('click',function(){ $('#navigation li a').filter(function(e,i){return e==currentstep;}).click(); });
	$('.previous').bind('click',function(){ $('#navigation li a').filter(function(e,i){return e==currentstep-2;}).click();});

	/*
	if there are errors don't allow the user to submit
	*/
	$('#registerButton').bind('click',function(){
		if($('#formElem').data('errors')){ alert('Los datos están incorrectos, por favor, revísalos'); return false; }	
	});
	$('.next').tooltip();
	$('.previous').tooltip();
	$('label').tooltip();
	$('input').tooltip();
	$('#captchaholder').tooltip();
});
