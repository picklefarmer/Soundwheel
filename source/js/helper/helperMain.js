	
App.EqHelper = Em.Helper.helper(function(a,b){
    return a === b 
  })

App.IsClassyHelper = Em.Helper.helper(function(index,current){
    console.log( index , current ) 
  	return index === current
  })

App.OuterHelper = Em.Helper.helper(function(outerParam){
    console.log(outerParam, "filler TExT")
  	return outerParam
  })

App.MaxHeightHelper = Em.Helper.helper(function(length){
  	var height =  $('body')[0].scrollHeight/2/20
  	console.log ( 'height', height ,length) 
  	return length > height
  })

App.ArrCompHelper = Em.Helper.helper(function(arrOne,arrTwo){
			debug = arrOne
			debug2 = arrTwo
			return arrOne === arrTwo
		})
		
App.BtnOutHelper = Em.Helper.helper(function(inx,bool){
			return !bool?inx-1:inx+1
		})
		
App.BtnRowHelper = Em.Helper.helper(function(inx,low){
			return inx + (low-1)
		})

App.ChordLenHelper = Em.Helper.helper(function(length){
			console.log("helper",length)
			return length <= 5
		})
						
App.CapitalizeHelper = 	Ember.Helper.helper(function(value) {
		  return value.capitalize();
		});

App.DasherizeHelper = Ember.Helper.helper(function(value) {
		  return value.dasherize().split("-")[1] || value;
		});

App.PropertyMeHelper = Ember.Helper.helper(function(value,controller) {
		  return this.get('controller.'+value)
		});

App.TypeOfHelper = Ember.Helper.helper(function(value,controller) {
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

App.LookUpHelper = Ember.Helper.helper(function(service,method) {
          var selectionArr = service.get(method+"Arr")
          console.log('lookup',service,method,selectionArr) 
          return selectionArr
        })

