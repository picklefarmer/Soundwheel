import Ember from 'ember';
var DEBUG;

export default Ember.Route.extend({
		model:function(params){
		
			params.y = [params.y.split("")][params.x] || params.y
//			console.log('song name', params.y)
			return params
		},
		init:function(){
//			console.log('init song route')
		},
		renderTemplate: function() {//render with specific class consider inject
		/*	tablature canvas 	 */
			this.render();
			var panels = ['nav','lyrics','inventory','plays'];


/*
		this.get('settings.data')
			.then(data => {
				panels.forEach(panel => {
					var panelData = data.findBy('name',panel);

					this.render(panel, {
						outlet:  panelData.panel,
			            into:"application",
 						controller:panel === "inventory" ? "inventory": "song"
		        });
			})
		})
	   */
	},
	actions:{
		ride:function(x,y){
				this.router.replaceWith("song",{x:x,y:y})
			},
	
		loading:function(){
				console.log ( "THIS _ IS _ LOADING" ) 
			}
		}
})
	



/*	bottom sidebar (chord) 
			this.render("inventory", {
	            outlet: "bottom",
	            into: "application",
				controller: "inventory"
		    });

/*	middle sidebar (text) 
			this.render("lyrics", {
				outlet: "middle",
				into: "application",
				controller: "song"
			});
	
/*	center sidebar (arrow) 
			this.render("plays", {
				outlet: "center",
				into: "application",
				controller: "song"
			});
		
/*	right sidebar (options) 
			this.render("nav", {
		        outlet: "right",
		        into: "application",
				controller: "song"
		    })
*/	
	
		
