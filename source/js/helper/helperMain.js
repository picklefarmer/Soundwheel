	
  Em.Handlebars.helper('is-classy',function(index,current){
    console.log( index , current ) 
  	return index === current
  })

  Em.Handlebars.helper('outer',function(outerParam){
    console.log(outerParam, "filler TExT")
  	return outerParam
  })

  Em.Handlebars.helper('max-height',function(length){
  	var height =  $('body')[0].scrollHeight/2/20
  	console.log ( 'height', height ,length) 
  	return length > height
  })

	Em.Handlebars.helper("arr-comp",function(arrOne,arrTwo){
			debug = arrOne
			debug2 = arrTwo
			return arrOne === arrTwo
		})
		
		Em.Handlebars.helper("btn-out",function(inx,bool){
			return !bool?inx-1:inx+1
		})
		
		Em.Handlebars.helper("btn-row",function(inx,low){
			return inx + (low-1)
		})
		Em.Handlebars.helper("chord-len",function(length){
			console.log("helper",length)
			return length <= 5
		})
						
		Ember.Handlebars.helper('capitalize', function(value) {
		  return value.capitalize();
		});
		Ember.Handlebars.helper('dasherize', function(value) {
		  return value.dasherize().split("-")[1] || value;
		});
		Ember.Handlebars.helper('propertyMe', function(value,controller) {
		  return this.get('controller.'+value)
		});

        Ember.Handlebars.helper('typeOf', function(value,controller) {
          var value = Em.typeOf(value),
              component = "";
          switch(value){
            case 'number' : component   = "option-set";     break;
            case 'string' : component   = "rgb-pallet";     break;
            case 'array'  : component   = "select-range";   break;
            case 'object' : component   = "select-set";     break;
            default       : component   = "boolean-switch"; break;
          }
          
          console.log(component,"component")
          return component
		});

        Ember.Handlebars.helper('lookUp',function(service,method) {
          var selectionArr = service.get(method+"Arr")
          console.log('lookup',service,method,selectionArr) 
          return selectionArr
        })
