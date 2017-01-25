import Ember from 'ember';
const  seat = {
        'edit':false,
        'chord':['chat-pane'],
        'lyrics':['chat-pane']
      },
      extract = function(group,panels){

        let port = panels.filter( obj => group.indexOf(obj.name) > -1) ;
        console.log(port,'port',group,panels)
          return port
      };

export default Ember.Component.extend({
  classNames:"toolbar",
  song:Ember.inject.service(),

  group:Ember.computed('base','source',function(){
    let group =  seat[this.get('base').split('.')[2]],
        panels  =   this.get('source').content;


    return group  ? extract(group,panels) : panels;
  }),

  willRender(){
    ///    console.log(this.get('source'), 'source',this.get('base'))
  }
});
