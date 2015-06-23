
App.Router.map(function() {
	this.route('catchall', {path: '/*wildcard'});
	this.route("about", { path: "/about" });
	
	this.route("song", { path: "/song/:x/:y" });	
	this.route("config",function(){
    this.route("instruments");  
    this.route("panels");
  });	
	this.route("personal");	
	this.route("user");	
	
	this.resource('mount',{path:'/mount/:x/:y'});
	
	this.resource('console', { path: '/:ison' },function(){
  	this.resource("menu", { path: '/:son' })  
  });
		// put your routes here
});


