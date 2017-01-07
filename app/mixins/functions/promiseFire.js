export default function(method){
			var ref =	this.get('firebase.base').ref(method),
					promise = new Ember.RSVP.Promise((res,rej) =>{
						ref.once('value',function(val){
							res(val.val())
						})
					}),
					proxy	=	RsvpO.create({promise});

			

			proxy.then(function(){
				ref.on('value',function(val){
					console.log('content', this, 'content of the thing')
					this.set('content',val.val())	
				},proxy)	
			})	

			return proxy
				//RsvpO.create({promise})
}

