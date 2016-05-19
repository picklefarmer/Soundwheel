import Ember from 'ember';

export default Ember.Component.extend({
    song:Ember.inject.service(),
    classNames:["scroll","sidebar"],
    tagName:"ul",
});
