App.LyricsPaneComponent = Ember.Component.extend({
	classNames:"lyrics",
    song:Em.inject.service(),
    actions:{
      update(data){
        console.log(data)
      }
    }

})

