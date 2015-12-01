
App.Router.map(function() {
	this.route('catchall', {path: '/*wildcard'});
	this.route("about", { path: "/about" });
	
	this.route("song", { path: "/song/:x/:y" },function(){
    this.route('chordEdit')
  });	

	this.route("config",function(){
    this.route("instruments");  
    this.route("panels");
  });	

	this.route("personal");	
	this.route("user");	
	
	this.route('mount',{path:'/mount/:x/:y'});
	
	this.route('console', { path: '/:ison' },function(){
  	this.route("menu", { path: '/:son' })  
  });
		// put your routes here
});


