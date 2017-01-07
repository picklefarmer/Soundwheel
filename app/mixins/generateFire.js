import Ember from 'ember';
import song from './instances/song';

const Proxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin),
			contents = song,
			Hash = Ember.RSVP.hash,
			promise	=	Hash(contents),
			fe = Proxy.create(promise);

export default Ember.Mixin.create({
	

})
