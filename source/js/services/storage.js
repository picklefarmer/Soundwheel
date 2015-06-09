App.StorageService  = Em.ObjectProxy.extend({
  content:function(){
    var online = this.get('onLine')?"firebase":"local"
    return this.get(online)
  }.property('onLine'),
  onLine:false,
  firebase:Em.inject.service(),
  local:Em.inject.service(),

selected(){}


})
