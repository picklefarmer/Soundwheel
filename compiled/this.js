Ember.MODEL_FACTORY_INJECTIONS = true;
var App = Ember.Application.create({});

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

App.SongsView = Em.CollectionView.extend({

	content: ["backView", "frontView", "centerView"],
	classNames: ["lest"],
	attributeBindings: ["id", "style"],
	x: Em.computed.oneWay("this.controller.model.x"),
	y: Em.computed.oneWay("this.controller.model.y"),
	id: "hing",
	mouseFormat: function mouseFormat(E) {
		var _temp, _temp2;

		//		console.log( this.get('element') )
		var x = E.offsetX == undefined ? E.pageX - (this.get("element").offsetLeft + 40) : E.offsetX;
		var y = E.offsetY == undefined ? E.pageY - (this.get("element").offsetTop + 100) : E.offsetY;

		E = (_temp = [~ ~((x - 10) / (1472 / 23)), ~ ~((y - 5) / (300 / 6))], _temp2 = _slicedToArray(_temp, 2), x = _temp2[0], y = _temp2[1], _temp);
		return E;
	},
	style: (function (_, y, x) {
		//		console.log(_,this.get('x'),this.get('y'))
		x = 100;
		//				x = 1220;
		y = 360;
		var v = "px;";
		var p = "%;";
		return "height:" + y + v + "width:" + x + p;
	}).property(),

	isFaded: Em.computed.oneWay("controller.isFaded"),
	isCleared: Em.computed.oneWay("controller.isCleared"),
	playType: Em.computed.oneWay("controller.playType"),
	tempo: Em.computed.oneWay("controller.tempo"),
	noteType: Em.computed.alias("controller.noteType"),
	playTo: (function () {
		var play = this.get("controller.play");
		if (play[1]) {
			this.toggleProperty("pause");
			Em.run(this, "play", play[1]);
		} else {
			Em.run(this, "edit", null, play);
			console.log("view play");
		}
	}).observes("controller.play"),
	globalKeydown: Em.inject.service(),
	didInsertElement: function didInsertElement() {
		var _this = this;

		console.log("getting it in");
		this.forEach(function (item, index) {
			if (item.element) _this.set(item.content, item.element.getContext("2d"));
		});

		$(document).keydown(function (e) {
			return Em.run(_this, _this.get("globalKeydown.begin"), e);
		});
	},
	willDestroyElement: function willDestroyElement() {
		console.log("destroy, view");
		$(document).off("keydown");
	},
	frontView: (function (a, ctx) {
		if (ctx) {
			ctx.font = "bolder 22px serif";
			ctx.fillStyle = "white";
		}
		return ctx || null;
	}).property(),
	centerView: (function (a, ctx) {
		if (ctx) {
			ctx.font = "bolder 22px serif";
		}
		return ctx || null;
	}).property(),
	backView: (function (a, b) {
		var twentyFour = 24,
		    width = this.get("width"),
		    dots = 2,
		    size = Math.ceil(1600 / 24),
		    fret = new Image();
		fret.src = "images/fret.jpg";
		console.log(width);
		//			fret.src = "lightning.svg";
		fret.onload = function () {
			b.fillStyle = "#012";
			//		b.fillRect(0,0,1600,300);
			b.fillRect(0, 0, width, 300);
			b.globalAlpha = 0.65;
			b.save();
			b.translate(0, 300);
			b.scale(1, -1);
			b.globalCompositeOperation = "lighter";
			while (dots--) {}
			//		b.drawImage(fret,2905,300)
			b.restore();
			b.fillStyle = "rgba(44,77,150,.122)";
			b.lineWidth = "5";
			b.beginPath();
			b.moveTo(770, 160);
			b.lineTo(795, 160);
			b.lineTo(745, 80);
			b.lineTo(765, 140);
			b.lineTo(740, 140);
			b.lineTo(790, 220);
			b.closePath();
			b.fill();
			b.fillStyle = "#333333";
			//b.stroke()

			dots = 4;
			while (twentyFour--) {

				b.fillStyle = "hsl(180,11%,32%)";
				b.fillRect(size * twentyFour, 0, 9, 300);
				b.fillStyle = "hsl(180,11%,42%)";
				b.fillRect(size * twentyFour + 2, 0, 5, 300);
			}

			b.fillStyle = "hsl(180,11%,32%)";
			while (dots--) {
				b.beginPath();
				b.arc(size * 2.5 + 3 + dots * size * 2, 150, 16, 0, 2 * Math.PI);
				b.fill();
			}
			dots = 4;
			while (dots--) {
				b.beginPath();
				b.arc(size * 14.5 + 3 + dots * size * 2, 150, 16, 0, 2 * Math.PI);
				b.fill();
			}
			dots = 2;

			while (dots--) {
				b.beginPath();
				b.arc(size * 11.5 + 3, 75 + 150 * dots, 16, 0, 2 * Math.PI);
				b.fill();
			}

			twentyFour = 6;
			while (twentyFour--) {
				b.fillStyle = "hsl(0,0%,5%)";
				b.fillRect(0, 22 + 50 * twentyFour, width, 6);
				b.fillStyle = "hsl(0,0%,40%)";
				b.fillRect(0, 24 + 50 * twentyFour, width, 3);
			}
		};
	}).property(),

	itemViewClass: Ember.View.extend({
		mouseMoveBinding: "mouseSelection",
		mouseSelection: (function () {
			if (this.get("parentView.controller.selection")) return this.get("console");
			return null;
		}).property("parentView.controller.selection"),
		console: function console(e) {
			Em.run.throttle(this.get("parentView"), "console", e, 2);
		},
		click: function click(e) {
			if (this.get("parentView.controller.selection")) {
				Em.run.once(this.get("parentView"), this.get("parentView.pushChord"), e);
			} else {
				Em.run.once(this.get("parentView"), this.get("parentView.prePushEdit"), e);
			}
		},
		mouseLeave: function mouseLeave() {
			if (this.get("parentView.controller.selection")) {
				Em.run.once(this.get("parentView"), "clear", "centerView");
			}
		},
		tagName: "canvas",
		classNames: ["tablature"],
		attributeBindings: ["width", "height"],
		heightBinding: "parentView.height",
		widthBinding: "parentView.width" }),
	height: 300,
	width: 1472,
	prePushEdit: function prePushEdit(e) {
		//			console.log ( 'parent' )
		var f = Em.run(this, "mouseFormat", e),
		    note = [f[0], this.get("mapAllocation")[f[0]][f[1]]],
		    obj = {};
		obj[f[1]] = note;

		//			console.log ( f  )
		Em.run(this, "editPush", obj);
	},
	pushChord: function pushChord(e) {
		var chord = this.get("chordTemp"),
		    noteMap = this.get("mapAllocation");

		pos = this.get("song.score")[this.get("song.index")];

		//			chord = chord.map(([x,y])=>[x,y,noteMap[x/67][y/50]])
		//			console.log( "__CHORD___",chord)
		for (var _iterator = chord[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
			var _step$value = _slicedToArray(_step.value, 2);

			var x = _step$value[0];
			var y = _step$value[1];

			x /= 67;
			y /= 50;
			pos[y] = [x, noteMap[x][y]];
		}

		Em.run(this, "edit", null, this.get("song.index"));
	},

	console: (function (_console) {
		var _consoleWrapper = function console() {
			return _console.apply(this, arguments);
		};

		_consoleWrapper.toString = function () {
			return _console.toString();
		};

		return _consoleWrapper;
	})(function (e) {
		var arr = this.get("controller.selection");
		var low = this.get("controller.low");
		var _Em$run = Em.run(this, "mouseFormat", e);

		var _Em$run2 = _slicedToArray(_Em$run, 2);

		var x = _Em$run2[0];
		var y = _Em$run2[1];

		if (x !== this.get("cacheX") || y !== this.get("cacheY")) {

			this.setProperties({ cacheX: x, cacheY: y });

			var diffX = ~ ~(this.get("controller.difference") / 2 - 1);
			var diffY = ~ ~(arr.length / 2);

			console.log(diffX, diffY, this.get("controller.difference"));

			arr = arr.map(function (fret, string) {
				fret -= low;
				fret += x;
				string += y;
				fret -= diffX;
				string -= diffY;
				fret *= 67;
				string *= 50;
				return [fret, string];
			});
			Em.run(this, "dotChord", arr);
		}
	}),

	editPush: function editPush(notes) {
		var pos = this.get("song.score")[this.get("song.index")],
		    name = Object.keys(notes)[0];
		//		console.log( this.get('song.score'),pos,"index: " +  this.get('song.index') , notes )
		if (pos) {
			if (!pos[name]) {
				console.log("add", name, notes[name]);
				pos[name] = notes[name];
				Em.run(this, "dot", notes[name][0], name, notes[name][1]);
			} else {
				console.log("remove" + name);
				//				Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
				Em.run(this, "erase", 67 * notes[name][0], 50 * name, "frontView");

				//				Em.run(this,'dot',pos[name][0],name,pos[name][1],true)
				Em.run(this, "erase", 67 * pos[name][0], 50 * name, "frontView");

				delete pos[name];
			}
		} else {
			this.get("song.score").push(notes);
		}
		//					console.log(this.get('song.score'),pos,name)
		//Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
		Em.run(this, "erase", 67 * notes[name][0], 50 * name);
	},
	dotsIndex: 0,
	dots: function dots(x, y, i) {

		Em.run.later(this, "dot", x, y, i, this.incrementProperty("dotsIndex") * this.get("tempo"));
	},
	erase: function erase(x, y, ctx) {
		this.get(ctx).clearRect(x + 8, y, 50, 50);
	},
	chordTemp: [],
	dotChord: function dotChord(chord) {

		var offset = 18,
		    scale = 36,
		    l = 8,
		    ctx = this.get("centerView");

		for (var _iterator = this.get("chordTemp")[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
			var _step$value = _slicedToArray(_step.value, 2);

			var x = _step$value[0];
			var y = _step$value[1];

			Em.run(this, "erase", x + 8, y + 8, "centerView");
		}

		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "white";

		for (var _iterator2 = chord[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
			var _step2$value = _slicedToArray(_step2.value, 2);

			var x = _step2$value[0];
			var y = _step2$value[1];

			ctx.beginPath();
			ctx.arc(offset + x + scale / 2, offset / 2 + y + scale / 2, scale / 2 / 8 * l, 0, 2 * Math.PI);
			ctx.fill();
		}
		this.set("chordTemp", chord);
		ctx.globalAlpha = 1;
	},
	playNotes: (function () {
		var chord = this.get("song.score").objectAt(this.get("song.index")).notes,
		    x = 67;
		y = 50;
		offset = 18, rate = 4, tempo = 15, scale = 36, tempChord = this.get("song.tempChord"), ctx = this.get("frontView");

		// console.log("premap",chord)
		chord = chord.map(function (e, f) {
			if (e) {
				return [offset + e * x + scale / 2, offset / 2 + y * f + scale / 2];
			}
		}).filter(function (e) {
			return e ? e : false;
		});
		console.log("postmap", chord);

		/* NOES 
   * {"3":[4,10]}
   * [0,3,12,4]
   * {'notes':[0,4,11],'lyrics':'string'}
  */

		tempChord.map(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2);

			var fret = _ref2[0];
			var string = _ref2[1];
			return ctx.clearRect(fret - scale / 2, string - scale / 2, scale, scale);
		});
		this.set("song.tempChord", chord);

		//			ctx.globalCompositeOperation = "source-over"

		//			note.play()

		for (var l = 0; l < rate; l++) {
			Em.run.later(this, function (l) {
				ctx.beginPath();
				chord.map(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2);

					var fret = _ref2[0];
					var string = _ref2[1];

					ctx.arc(fret, string, scale / 2 / rate * l, 0, 2 * Math.PI);
					ctx.closePath();
				});
				ctx.fill();
			}, l, l * tempo);
		}

		//Em.run.later(this,()=>note.pause(),(rate-1)*tempo)
	}).observes("song.index"),

	dot: function dot(x, y, i) {
		x *= 67;
		y *= 50;
		//			try{
		var note = this.get("notes")[i];
		//			}catch(e){
		//				console.log(e)
		//			}
		var offset = 18,
		    ctx = this.get("frontView"),
		   
		//fifths = this.get('fifths'),
		rate = 4,
		    tempo = 15,
		    scale = 36;
		//fade = this.get('isFaded'),
		//h  = (360/12)*i,
		//names =   ["C","G","D","A","E","B","F#","C#","G#","D#","A#","F"][i%12],
		//initVol = this.get('volume')

		//	arr = fifths[i];
		//	console.log(note,x,y,i,"notes")
		//  x = arr[0]; y = arr[1]; h = arr[2];

		ctx.clearRect(offset + x, offset / 2 + y, scale, scale);

		//			ctx.globalCompositeOperation = "source-over"
		note.play();

		for (var l = 0; l < rate; l++) {
			Em.run.later(this, function (l) {
				ctx.beginPath();
				ctx.arc(offset + x + scale / 2, offset / 2 + y + scale / 2, scale / 2 / rate * l, 0, 2 * Math.PI);
				ctx.fill();
			}, l, l * tempo);
		}

		Em.run.later(this, function () {
			return note.pause();
		}, (rate - 1) * tempo);
	},
	clearObserver: (function () {
		Em.run.next(this, "clear");
	}).observes("controller.clear"),
	clear: function clear() {
		var ctx = arguments[0] === undefined ? "frontView" : arguments[0];

		this.get(ctx).clearRect(0, 0, 1400, 300);
	},
	draw: function draw() {
		var type = this.get("block"),
		    map = this.get("mapAllocation"),
		    x = this.get("x"),
		    y = this.get("y");

		Em.run(this, "clear");

		//	Em.run(this,'dot',this.get('x')-1,this.get('y'),(type-1)%12)
		//	Em.run(this,'dot',this.get('x')+1,this.get('y'),(type+1)%12)
		Em.run(this, "dot", x, y, type);
		Em.run(this, "dot", x, y - 1, map[x][y - 1]);
		Em.run(this, "dot", x, y + 1, map[x][y + 1]);
	},
	mapAllocation: (function () {
		var map = [],
		    _x = 22,
		    _y = 6,
		    deFifth = (function () {
			var count = 4,
			    arr = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5],
			    self = [];
			while (count--) {
				self.push(arr.map(function (e) {
					return e + 12 * (3 - count);
				}));
			}
			self = self.reduce(function (a, b) {
				return a.concat(b);
			});
			return self;
		})();

		while (_x--) {
			map.push([]);
			while (_y--) {
				//					console.log(map[17-_x])
				map[21 - _x].push(deFifth[(5 + (21 - _x) + _y * 5 + (_y > 3 ? -1 : 0)) % 48]);
			}
			_y = 6;
		}

		return map;
	}).property(),

	editPlay: function editPlay(direction, note) {
		var index;
		console.log("is playing ");
		//note = this.get('song.score').objectAt(this.get('song.index'))
		note = this.get("song.score").objectAt(this.get("song.index"));
		console.log(note, " name, error ");
		Object.keys(note).forEach(function (e) {
			var name;
			if (this.get("isCleared")) {
				Em.run(this, "clear");
			}
			if (e === "l") {
				console.log(note[e]);
			} else if (e[1]) {
				//	console.log(e)
				name = e.split(",");
				Em.run(this, "dot", name[0], name[1], note[e]);
			} else {
				name = note[e];
				//console.log("ASDF",name[0],name[1],e)
				Em.run(this, "dot", name[0], e, name[1]);
			}
		}, this);
	},
	//}.observes('song.index'),

	pause: true,
	play: function play(direction, tempo, playType) {
		//		console.log(this.get('playType'))	

		tempo = tempo || this.get("tempo");
		playType = playType || this.get("playType");

		if (!this.get("pause")) {
			Em.run.later(this, "play", direction, tempo, playType, tempo);
			//					Em.run.schedule(this,playType,direction)		
			this[direction](playType + "Index");
		}
	},
	volume: 0.25,
	notes: (function () {
		console.log("F");
		var volume = this.get("volume");

		// circle of fifths
		var octaves = [0.5, 1, 2, 4],
		    octaveIndex = 4;
		var noteType = this.get("noteType") ? play_tone : play_tone_webAudio;
		console.log(noteType);
		var notes = [261.63, //	0
		392, //	7
		293.66, //	2
		440, //	9	
		329.63, //	4
		493.88, //	11
		369.99, //	6
		277.18, //	1
		415.3, //	8
		311.13, //	3
		466.16, //	10
		349.23]; //	5

		while (octaveIndex--) {
			octaves[3 - octaveIndex] = notes.map(function (e) {
				return e * octaves[3 - octaveIndex];
			});
		}
		notes = octaves.reduce(function (a, b) {
			return a.concat(b);
		});
		notes = notes.map(function (e) {
			return noteType(e, volume);
		});

		return notes;
	}).property("noteType") });

//		b.drawImage(fret,600*dots,0,600,488)
//	note.volume = initVol;
//	note.currentTime = 0;
/* LEGACY
 * ctx.clearRect(x,y,scale/2,scale/2)
 * if(note.volume >= .12)
 * note.volume -=.12
 * ctx.fillStyle = "hsl("+ h +",100%,"+l*7+"%)";
 * ctx.fillStyle = "hsl("+ h +",100%,40%)"
 * ctx.fillText(names,(offset/2)+(names[1]?-5:1)+x+scale/2,offset/2+8+y+scale/2)
 * ctx.fill()
*/

App.UserRoute = Em.Route.extend({
  actions: {
    login: function login() {
      this.auth.login();
    },
    logout: function logout() {
      this.auth.logout();
    }

  }
});

Em.Application.initializer({
  name: "firebase-compile",

  initialize: function initialize(container, App) {

    App.inject("component:menu-bar", "logger", "login:side");
    App.inject("route:song", "settings", "settings:side");
    App.inject("component:pa-nels", "settings", "settings:side");
    App.inject("component:tool-bar", "settings", "settings:side");

    App.inject("component:option-panel", "song", "service:song");
    App.inject("component:play-bar", "song", "service:song");
    App.inject("component:measure-bar", "song", "service:song");
    App.inject("component:fret-board", "options", "service:options");
    App.inject("component:fret-board", "song", "service:song");
    App.inject("controller:song", "song", "service:song");
    //        App.inject('view:song','song', 'service:song')

    App.inject("component:pa-nels", "_actions", "settings:actions");
    App.inject("route:user", "auth", "service:auth");
    App.inject("component:log-in", "auth", "service:auth");
  }

});

var DEBAG;

App.register("service:local", Em.Object.extend({
  //play properties

  /*
  score:function(_,nw,ld){
    return this.get('songSelection') || Em.A([[]])
  }.property('songSelection'),
  */
  selected: (function (_, _x, oldSelected) {
    var selected = arguments[1] === undefined ? "fizz" : arguments[1];

    console.log(_, selected, oldSelected);
    _ = this;
    new Em.RSVP.Promise(function (res, rej) {
      var om = JSON.parse(JSON.parse(localStorage.songs)[selected]);
      console.log("promise");
      res(_.set("songSelection", om));
    });
    return selected;
  }).property(),

  chordSave: function chordSave() {
    var chords = this.get("chordBank");
    var chords = JSON.stringify(this.get("chordBank"));

    localStorage.chords = chords;
  },
  /*
  chordBank:function(_,nw){
    console.log(nw, "BANK CHORD")
    return this.get('chordCache') || Em.A([[]]) 
  }.property('chordCache'),
  */
  chords: (function (_, async, __) {
    var _ = this;
    console.log("chords", async, __);
    if (!async) {
      new Em.RSVP.Promise(function (res, ref) {
        var om = JSON.parse(localStorage.chords);
        console.log("promise chord");
        res(_.set("chordCache", om));
      });
    }
    return async;
  }).property(),

  /*
  chordSelection:function(_,I){
    console.log(I)
    return I 
  }.property(),
  index:function(a,b){
    console.log(b,"index")
    if(b < 0){
      b = this.get('score').length-1
    }
    a = b%this.get('score').length || 0;
    return a
  }.property('score.[]'),
  /
  meter:function(){
    return ~~((60/(this.get('tempo')))*1000) 
  }.property('tempo'),
  bpm:320,
  tempo:function(_,__){
    return 2264 - this.get('bpm')
  }.property('bpm'),
  pause:false,
  cacheNotes:[[]],
  measure:function(){
    console.log('meaure in init',this.get('score'),this.get('score'))
    return this.get('score').objectAt(this.get('index'))
  }.property('index','score'),
   clock:function(){
    if(this.pause){ 
         this.incrementProperty('index')
         Em.run.later(this,'clock',this.get('tempo'))    
    }
  }.observes('pause'),
  tempChord:[],
  */
  names: (function () {
    var names = Object.keys(JSON.parse(localStorage.songs));
    return Em.A(names) //|| ["fizz","fuzz"]
    ;
  }).property()
}));

App.GlobalKeydownService = Em.Service.extend({
											begin: function begin(e) {

																						var is,
																						    x = this.get("x"),
																						    y = this.get("y"),
																						    type = this.get("playType"),
																						    index = this.get("song.index");
																						if (e) switch (e.keyCode) {

																																	case 37:
																																												this.decrementProperty("song.index");
																																												break;
																																	case 38:
																																												this.toggleProperty("song.pause");
																																												console.log("play", this.get("song.pause"));
																																												break;
																																	case 39:
																																												this.incrementProperty("song.index");
																																												break;
																																	case 40:
																																												this.toggleProperty("pause");
																																												Em.run(this, "play", "decrementProperty");
																																												this.set("controller.direction", 1);break;
																																	case 32:
																																												Em.run(this, "playNotes");break;
																																	//append
																																	case 13:
																																												this.get("song.score").insertAt(this.get("song.index") + 1, { notes: [0, 0, 0, 0, 0, 0] });
																																												this.set("song.index", index + 1);
																																												break;
																																	//delete
																																	case 46:
																																												this.get("song.score").removeAt(index, 1);
																																												index === this.get("song.score.length") ? this.decrementProperty("song.index") : "";
																																												break;
																																	//copy
																																	case 45:
																																												var score = this.get("song.score"),
																																												    temp = Em.copy(score[index].notes);
																																												score.insertAt(index + 1, { notes: temp });
																																												this.incrementProperty("song.index");
																																												break;
																																	default:
																																												break;
																						}
																						if (is) {
																																	console.log("fired");
																																	this.get("controller.target").send("ride", x, y);
																						}
											}
});

Em.Application.initializer({
  name: "firebase-init",
  before: "firebase-compile",

  initialize: function initialize(container, App) {

    App.register("login:side", Ember.Object.extend({
      menuBar: (function () {
        return $.getJSON("./json/routes.json");
      }).property()
    }));

    App.register("login:auth", Ember.Object.extend({
      menuBar: (function () {
        return $.getJSON("./json/routesAuth.json");
      }).property()
    }));

    App.register("settings:actions", Ember.Object.extend({
      click: function click(param) {
        //DEBUG = param
        console.log("free", param);
      }
    }));

    App.register("settings:side", Ember.Object.extend({

      menuBars: ["left", "right", "bottom", "top", "center", "middle"],
      datas: (function () {
        var _this = this;

        this.get("data").then(function (data) {
          return _this.set("datas", data);
        });
      }).property(),
      data: (function () {
        //return $.getJSON('./json/panelsDefault.json');
        return $.getJSON("./json/panelsAuth.json", function (err) {});
      }).property()
    }));
  }
});

//.set('hide',true))

//          console.log(err)
/*

var base = new Firebase('https://acroeven.firebaseio.com/music');
var chords = base.child('chords');

*/
//App.SongController = Em.Controller.extend({
/*
		needs:'inventory',
		songs:function(){

						var one = Firebase.List.create({ref:base})
						//	console.log ( one.names ) 
						return one

				}.property(),

*/
//App.InventoryController = Em.Controller.extend({
/*
	model:function(){
		return	Firebase.List.create({
			ref:chords
			})
	}.property(),

*/

App.InstrumentsService = Em.Service.extend({
  organ: (function () {
    var tables = this.get("tables");
    var c = tables.real.length;
    var real = new Float32Array(tables.real);
    var imag = new Float32Array(tables.imag);
    //        for (var i = 0; i < c; i++) {
    //        real[i] = tables.real[i];
    //      imag[i] = tables.imag[i];
    //  }
    return { real: real, imag: imag };
  }).property(),
  /*
    tables:function(){
          return $.getJSON("./json/organ.json")
    }.property()
  */
  tables: {
    real: [0, -0, -0.042008, 0.010474, -0.138038, 0.002641, -0.001673, 0.001039, -0.021054, 0.000651, -0.000422, 0.000334, -0.000236, 0.000191, -0.000161, 0.000145, -0.018478, 0.000071, -0.000066, 0.000047, -0.000044, 0.000041, -0.000034, 0.000031, -0.00003, 0.000028, -0.000025, 0.000024, -0.000022, 0.00002, -0.000015, 0.000013, -0.01157, 0.000004, -0.000003, 0.000003, -0.000003, 0.000003, -0.000003, 0.000002, -0.000002, 0.000002, -0.000002, 0.000002, -0.000002, 0.000002, -0.000002, 0.000002, -0.000001, 0.000001, -0.000001, 0.000001, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000898, 0.000001, -0.000001, 0.000001, -0.000001, 0.000001, -0.000001, 0.000001, -0.000001, 0.000001, -0.000001, 0.000001, -0.000001, 0.000001, -0.000001, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000245, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000106, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000003, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0],
    imag: [0, 0.196487, -0, 0, -0.000003, 0, -0, 0, -0.000002, 0, -0, 0, -0, 0, -0, 0, -0.000007, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000018, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000006, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000006, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.00001, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0.000001, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0, 0, -0] } });

function play_tone(freq, volume) {

    var samples = [];
    var samples_length = 44100; // 1 second (44.1 KHz)
    for (var i = 0; i < samples_length; i++) {
        // fills array with samples
        var t = i / samples_length; // time from 0 to 1
        // Generate samples using sine wave equation (between 0 and 255)
        samples[i] = 128 + Math.round(127 * Math.sin(freq * 2 * Math.PI * t));
    }

    var wave = new RIFFWAVE(); // Create raw wav file
    wave.header.sampleRate = 44100; // 44.1Khz (1 second)
    wave.header.numChannels = 1; // 1 channel (mono)
    wave.Make(samples);

    var audio = new Audio(); // Create <audio> tag
    audio.src = wave.dataURI;
    audio.volume = volume;
    return audio;
}

App.WebaudioService = Em.Service.extend({
    instruments: Em.inject.service(),
    tone: function tone(freqs, volume) {

        return this.get("toneObject").create({
            instruments: this.get("instruments"),
            freqs: freqs
        });
    },
    toneObject: Em.Object.extend({
        //        freqs,
        init: function init() {
            var tone = this.get("tone"),
                ctx = this.get("ctx"),
                ac = this.get("ac");
            var I = this.get("instruments.organ");
            tone.setPeriodicWave(ac.createPeriodicWave(I.real, I.imag));
            tone.connect(ctx);
            ctx.gain.value = 0.135;
            tone.start(0);
            ctx.connect(ac.destination);
        },
        freq: (function (name, tone) {
            return this.get("freqs").objectAt(tone);
        }).property("freqs"),
        ac: new (window.AudioContext || window.webkitAudioContect)(),
        ctx: (function () {
            return this.get("ac").createGain();
        }).property("ac"),
        tone: (function () {
            return this.get("ac").createOscillator();
        }).property("ac"),
        play: (function () {
            var ctx = this.get("ctx"),
                tone = this.get("tone"),
                currentTime = ctx.context.currentTime;

            ctx.gain.exponentialRampToValueAtTime(0.5, currentTime + 0.125);
            tone.frequency.exponentialRampToValueAtTime(this.get("freq"), currentTime);
            ctx.gain.exponentialRampToValueAtTime(0.01, currentTime + 1);
        }).observes("freq"),
        pause: function pause() {
            // console.log( 'pause' )
            this.get("ctx").gain.exponentialRampToValueAtTime(0.01, this.get("ctx").context.currentTime);
        },
        volume: (function (value) {
            this.get("ctx").gain.value = value;
        }).property()
    })
});

App.TonesService = Em.Service.extend({
    webaudio: Em.inject.service(),
    strings: (function () {
        //  console.log('init from notes' )
        var notesMap = [],
            octaves = [0.5, 1, 2, 4],
            strings = [],
            string = 5,
            frequencies = [261.63, //	0
        277.18, //	1
        293.66, //	2
        311.13, //	3
        329.63, //	4
        349.23, //	5
        369.99, //	6
        392, //	7
        415.3, //	8
        440, //	9	
        466.16, //	10
        493.88 //	11
        ];
        notesMap = octaves.map(function (multiplier) {
            return frequencies.map(function (frequency) {
                return multiplier * frequency;
            });
        }).reduce(function (e, f) {
            return e.concat(f);
        });
        while (string >= 0) {
            var start = undefined;
            switch (string) {
                case 5:
                    start = 4 + 4 * 5 + 4;break;
                case 4:
                    start = 4 + 3 * 5 + 4;break;
                default:
                    start = 4 + string * 5;break;
            }
            strings[string] = notesMap.slice(start, start + 22);
            strings[string].unshift(1);
            string--;
        }
        return strings.reverse();
    }).property(),
    init: function init() {
        var strings = this.get("strings").map(this.get("webaudio.tone"), this.get("webaudio"));
        DEBUG = strings;
        //  console.log("STRINGS in service map",strings,this.get('strings'))
        this.set("tone", Em.A(strings));
    } });
//this.ctx.disconnect()

App.AuthService = Em.Service.extend({
  init: function init() {
    var base = new Firebase("http://acroeven.firebaseio.com/music");
    this.set("base", base);
  },
  uid: (function () {
    var uid = this.get("base").getAuth();
    uid = uid ? uid.uid : null;
    return uid || "Personal";
  }).property("base"),
  user: (function () {
    var user = this.get("uid");
    return this.get("base").child(user);
  }).property("uid"),
  songList: Em.A([]),
  baseList: (function () {
    //this.get('base').child(this.get('uid')).on("value",(snapshot) => {
    this.get("base").on("value", function (snapshot) {
      console.log("ASDFASDF", snapshot.val());
    });
  }).observes("uid"),
  login: function login() {
    var _this = this;

    this.get("base").authWithOAuthPopup("facebook", function (error, authData) {
      if (error) {
        console.log(error, "error");
      } else {
        console.log(authData, authData.uid);
        _this.set("uid", authData.uid);
        _this.set("user", _this.get("base").child(authData.uid));
      }
    }, {
      //             remember: "sessionOnly",
      scope: "email,user_likes"
    });
  },
  logout: function logout() {
    console.log("logout");
    this.get("base").unauth();
    this.set("uid", "Personal");
  },
  update: function update() {},
  selected: (function (_) {
    var _this = this;

    var selected = arguments[1] === undefined ? "fizz" : arguments[1];

    console.log(selected, "AUTH SELECTED");
    this.get("user").child("songs").child(selected).on("value", function (snapshot) {
      console.log(snapshot.val(), snapshot.key());
      snapshot.forEach(function (e) {
        console.log("snappy", e.val(), e.key());
      });
      _this.set("songSelection", snapshot.val());
    });
    return selected;
  }).property("names"),

  chords: (function () {
    var _this = this;

    this.get("user").child("chords").on("value", function (snapshot) {
      _this.set("chordCache", snapshot.val());
    });
  }).property(),
  names: Em.A([]),
  namesList: (function () {
    var _this = this;

    console.log("names");
    this.get("user").child("songs").on("value", function (snapshot) {
      _this.set("names", Em.A(Object.keys(snapshot.val())));
    });
  }).property("names")

});
//            var newPost = snapshot.val().map(e => e.key());
//            this.set('songList',newPost)

App.OptionsService = Em.Service.extend({
  onLine: true,
  song: Em.inject.service(),
  ls: (function () {}).property(),
  clear: function clear() {
    this.get("centerView").clearRect(0, 0, 1400, 300);
  },
  load: function load() {},
  save: function save() {
    var selected = this.get("song.selected");
    var song = JSON.stringify(this.get("song.score"));
    var storage = JSON.parse(localStorage.songs);

    storage[selected] = song;
    localStorage.songs = JSON.stringify(storage);
    console.log("saved");
  },
  actionNames: [{ name: "load", type: "core" }, { name: "save", type: "core" }, { name: "onLine", type: "check", "class": "slideThree" }, { name: "clear", type: "core" }, { name: "isFaded", type: "check", "class": "slideThree" }, { name: "isCleared", type: "check", "class": "slideThree" }, { name: "noteType", type: "check", "class": "slideThree" }] });

App.SongService = Em.ObjectProxy.extend({
  content: (function () {
    var online = this.get("onLine") ? "auth" : "local";
    return this.get(online);
  }).property("onLine"),
  onLine: false,
  auth: Em.inject.service(),
  local: Em.inject.service(),

  score: (function (_, nw, ld) {
    return this.get("songSelection") || Em.A([{ notes: [0, 0, 0, 0] }]);
  }).property("songSelection"),

  measure: (function () {
    console.log("meaure in init", this.get("score"), this.get("score"));
    return this.get("score").objectAt(this.get("index")) || { notes: [] };
  }).property("index", "score"),
  update: function update(params) {
    console.log("asdfasdf", params);
    if (this.get("onLine")) {
      this.get("user").child("songs/" + this.get("selected") + "/" + this.get("index")).update({ notes: params.toArray() });
    }
  },
  index: (function (a, b) {
    console.log(b, "index");
    if (b < 0) {
      b = this.get("score").length - 1;
    }
    a = b % this.get("score").length || 0;
    return a;
  }).property("score.[]"),
  meter: (function () {
    return ~ ~(60 / this.get("tempo") * 1000);
  }).property("tempo"),
  bpm: 320,
  tempo: (function (_, __) {
    return 2264 - this.get("bpm");
  }).property("bpm"),
  pause: false,
  cacheNotes: [[]],
  clock: (function () {
    if (this.pause) {
      this.incrementProperty("index");
      Em.run.later(this, "clock", this.get("tempo"));
    }
  }).observes("pause"),
  tempChord: [],
  chordBank: (function (_, nw) {
    console.log(nw, "BANK CHORD");
    return this.get("chordCache") || Em.A([[]]);
  }).property("chordCache"),

  chordSelection: (function (_, I) {
    console.log(I);
    return I;
  }).property() });

App.Router.map(function () {
	this.route("catchall", { path: "/*wildcard" });
	this.route("about", { path: "/about" });

	this.route("song", { path: "/song/:x/:y" });
	this.route("config");
	this.route("personal");
	this.route("user");

	this.resource("mount", { path: "/mount/:x/:y" });

	this.resource("console", { path: "/:ison" }, function () {
		this.resource("menu", { path: "/:son" });
	});
	// put your routes here
});

var DEBUG;
App.SongRoute = Em.Route.extend({
	model: function model(params) {

		params.y = [params.y.split("")][params.x] || params.y;
		console.log(params.y);
		return params;
	},
	init: function init() {
		console.log("init song route");
	},
	renderTemplate: function renderTemplate() {
		//render with specific class consider inject
		/*	tablature canvas 	 */
		this.render();
		var panels = ["nav", "lyrics", "inventory", "plays"];

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
	actions: {
		ride: function ride(x, y) {
			this.router.replaceWith("song", { x: x, y: y });
		},

		loading: function loading() {
			console.log("THIS _ IS _ LOADING");
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
;

App.AboutView = Ember.View.extend({
	tagName: "canvas",
	fifths: [],
	classNames: ["circle"],
	didInsertElement: function didInsertElement() {
		var self = this;
		$(document).keydown(function (e) {
			if (e.keyCode === 32) {
				Em.run(self, "clear");
				Em.run(self, "circle");
			}
		});
		this.set("ctx", this.get("element").getContext("2d"));
		var canvas = this.get("element");
		canvas.height = 300;
		canvas.width = 300;

		var mnt = 100;
		var arr = [];
		//	ctx.font = "16px sans-serif";
		var x, y, h;
		for (var i = 0; i < 12; i++) {
			x = 125 + mnt * Math.cos((i - 1) / 1.9);
			y = 125 + mnt * Math.sin((i - 1) / 1.9);
			h = i * (360 / 12);

			this.fifths.push([x, y, h]);
		}
		for (var i = 0; i < 3; i++) {
			arr.push(~ ~(Math.random() * 12));
		}
		Em.run(this, "circle");
	},

	draw: function draw(start) {
		var arrs = this.get("fifths"),
		    pointOne = arrs[start],
		    pointTwo = arrs[(start + 5) % 12],
		    pointThree = arrs[(start + 10) % 12];
		scale = 50;

		var ctx = this.get("ctx");
		ctx.fillStyle = "hsl(1,0%,19%)";
		ctx.strokeStyle = "#fff";
		ctx.beginPath();
		ctx.moveTo(arrs[start[0]][0] + scale / 2, arrs[start[0]][1] + scale / 2);
		for (var i = 0; i < start.length; i++) {
			ctx.lineTo(arrs[start[i]][0] + scale / 2, arrs[start[i]][1] + scale / 2);
		}
		ctx.closePath();

		ctx.stroke();
		ctx.fill();
	},
	dot: function dot(i) {
		var x, y, h, arr;
		try {
			var note = this.get("notes")[i];
		} catch (e) {
			console.log(i, this.get("notes"));
		}
		var ctx = this.get("ctx");
		var fifths = this.get("fifths"),
		    scale = 50;

		arr = fifths[i];
		//	console.log(arr,i,fifths)
		x = arr[0];y = arr[1];h = arr[2];

		for (var l = 0; l < 8; l++) {
			note.play();
			Em.run.later(this, function (l) {
				//	ctx.clearRect(x,y,scale/2,scale/2)

				if (note.volume >= 0.12) note.volume -= 0.12;
				ctx.fillStyle = "hsl(" + h + ",100%,50%)";
				ctx.beginPath();
				ctx.arc(x + scale / 2, y + scale / 2, scale / 2 / 8 * l, 0, 2 * Math.PI);
				ctx.fill();

				if (l === 7) {
					note.pause();
					note.volume = 1;
				}
			}, l, l * 25);
		}
	},
	circle: function circle() {
		for (var i = 0; i < 12; i++) {
			Em.run.later(this, "dot", i, i * 150);
		}
	},
	clear: function clear() {

		this.get("ctx").clearRect(0, 0, 300, 300);
	},
	click: function click() {
		var three = 4,
		    rand = [],
		    r;
		Em.run(this, "clear");

		while (three--) {
			r = ~ ~(Math.random() * 12);
			rand.push(r);
			Em.run(this, "dot", r);
		}

		Em.run(this, "draw", rand);
	},
	notes: (function () {
		console.log("F");
		var volume = 1; //.25 //this.get('volume');

		// circle of fifths
		// 
		var notes = [261.63, 392, 293.66, 440, 329.63, 493.88, 369.99, 277.18, 415.3, 311.13, 466.16, 349.23];

		notes = notes.map(function (e) {
			return play_tone(e, volume);
		});

		return notes;
	}).property() });
//	ctx.fillRect(x,y,27,27)
//	ctx.fillStyle = "black"
//	ctx.fillText(i+1 , x+8, y+16 )
//Em.run(this,'circle')

App.TheGreatComponent = Ember.Component.extend({
	tagName: "canvas",
	classNameBindings: ["more"],
	attributeBindings: ["id", "style", "width", "height"],
	id: "canvas",
	tone: false,
	height: 120,
	width: 90,
	show: true,
	model: 0,
	sine: 0,
	volume: Em.computed.alias("parentView.volume"),
	meter: Em.computed.alias("parentView.meter"),
	animated: Em.computed.alias("parentView.animated"),
	count: Em.computed.alias("parentView.count"),
	beat: Em.computed.alias("parentView.beat"),
	scoreIndex: Em.computed.alias("parentView.scoreIndex"),

	noteLength: (function (a, b) {
		//console.log(b)
		return b / 100;
	}).property(),

	score: (function () {
		var a = this.get("sine");
		var expression = Math.abs(Math[this.get("expression")](a)).toString();

		if (expression[1] && expression !== "-Infinity") {
			return expression.split(".").join("").split(/(1[0-1]|[0-9])/g).filter(function (e) {
				return e && e !== "e-" ? true : false;
			});
		} else {
			return [];
		}
	}).property("sine", "expression"),

	style: (function () {
		return "height:" + this.get("height") + ";width:" + this.get("width") + ";background:black";
	}).property(),

	ctx: (function () {
		var init = this.get("element").getContext("2d");
		init.fillStyle = "yellow";
		init.font;

		return init;
	}).property(),
	stream: (function (m, animated) {
		console.log(animated, "animated");
		return !this.get("animated") ? "draw" : "animate";
	}).property("animated"),
	animate: function animate(note, nextNote) {
		var width = this.get("width");
		var height = this.get("height");
		var scale = height / 4;
		var ctx = this.get("ctx");
		var x = note % 3 * scale;
		var y = note % 4 * scale;
		var _x = nextNote % 3 * scale;
		var _y = nextNote % 4 * scale;
		var radius = scale / 2;
		var hsl = "hsl(" + ~ ~(255 / 12) * note + ",100%,";
		var meter = this.get("meter");
		var meterCount = meter;
		var deltaX = (_x - x) / meter;
		var deltaY = (_y - y) / meter;

		function update(X, Y) {
			var rad = ctx.createRadialGradient(X + radius, Y + radius, radius / 2, X + radius, Y + radius, radius);
			rad.addColorStop(0, hsl + "50%)");
			rad.addColorStop(0.2, hsl + "25%)");
			rad.addColorStop(1, hsl + "0%)");

			ctx.clearRect(0, 0, width, height);

			ctx.beginPath();
			ctx.arc(X + scale / 2, Y + scale / 2, scale / 2, 0, 2 * Math.PI);
			ctx.fillStyle = rad;
			ctx.fill();
			if (--meterCount > -1) {
				Em.run.later(update, _x - deltaX * meterCount, _y - deltaY * meterCount, 40);
			}
		}

		update(x, y);
	},
	draw: function draw(note) {

		var width = this.get("width");
		var height = this.get("height");
		var scale = height / 4;
		var ctx = this.get("ctx");
		var x = note % 3 * scale;
		var y = note % 4 * scale;
		var radius = scale / 2;
		var hsl = "hsl(" + ~ ~(255 / 12) * note + ",100%,";

		var rad = ctx.createRadialGradient(x + radius, y + radius, radius / 2, x + radius, y + radius, radius);
		rad.addColorStop(0, hsl + "50%)");
		rad.addColorStop(0.2, hsl + "25%)");
		rad.addColorStop(1, hsl + "0%)");

		ctx.clearRect(0, 0, width, height);

		ctx.beginPath();
		ctx.arc(x + scale / 2, y + scale / 2, scale / 2, 0, 2 * Math.PI);
		ctx.fillStyle = rad;
		ctx.fill();
	},

	melody: function melody() {
		if (this.get("count") === ~ ~this.get("beat")) Em.run(this, "measure");
	},

	measure: function measure() {
		var score, notes; //,notelength;
		if (this.get("tone")) {
			notes = this.get("notes");

			score = this.get("score");
			//	notelength = this.get('notelength');
			scoreIndex = this.get("scoreIndex"), sound = notes[score[scoreIndex]];
			if (sound) {
				sound.play();
				Em.run(this, "audioLength", scoreIndex);

				////console.log(notes[score[a]].currentTime)

				if (score[scoreIndex + 1]) {
					//				console.log()	
					//	//console.log(this.get('scoreIndex'))
					try {
						this.incrementProperty("scoreIndex");
					} catch (e) {
						console.log("update fail");
					}
				} else {

					this.set("scoreIndex", 0);
				}

				Em.run(this, this.get("stream"), score[scoreIndex], score[scoreIndex + 1] || score[0]);
			}
		}
	},
	audioLength: function audioLength(a) {
		var noteLength,
		    notes = this.get("notes"),
		    scoreIndex = a;
		score = this.get("score")[scoreIndex], sound = notes[score];

		if (sound) {
			noteLength = this.get("noteLength");
			//	console.log(noteLength)	
			if (sound.currentTime > noteLength) {

				sound.pause();
				sound.currentTime = 0
				//	sound.volume = this.get('volume')
				;
			} else {
				if (this.get("playProp")) Ember.run.later(this, function () {
					Em.run(this, "audioLength", a);
				}, 20);
			}
		}
		//console.log(audio.currentTime)
	},
	play: (function () {

		if (this.get("score")) Em.run(this, "melody");
	}).observes("playProp")

});
//		if(this.get('loopValue')>0)
//		this.decrementProperty('loop')

//melody(this.get('sine'),this.get('loop'))
//console.log('playing')

App.ConsoleRoute = Ember.Route.extend({
	actions: {

		urlUpdater: function urlUpdater(a, menu) {
			a = a.map(function (e) {
				var scoreIndex = e.scoreIndex;
				if (e.scoreIndex < 10) {
					scoreIndex = "0" + scoreIndex;
				}
				//	console.log(scoreIndex)
				return e.skip ? e.expression[0] + scoreIndex + "" + e.beat + "" + e.sine : [];
			}).join("");

			b = this.get("controller");
			b = b.get("volume") + "_" + b.noteLength + "_" + b.meter;
			console.log("urlUpdater", b, a);
			this.router.replaceWith("menu", b, a);
			Em.run(menu, "time");
		}
	},
	setupController: function setupController(controller, model) {
		controller.set("model", model); //console.log("P")
	}

});

App.ConsoleController = Ember.Controller.extend({
	needs: "menu",
	title: "APP",
	meter: 9,
	isPlaying: false,
	playProp: false,
	tope: "play",
	noteLength: 50,
	model: (function (_, _new, _prev) {
		//	//console.log("index",_new,_prev)	
		var _new,
		    _newLength,
		    objToReturn,
		    _newKeys,
		    self = this;
		if (_new) {
			if (_new.ison) {

				//console.log('index.son',_new.son)	

				_new = _new.ison.split("_");
				//console.log("controlers" ,_new)
				objToReturn = {};
				_newKeys = ["volume", "noteLength", "meter"];
				_new.forEach(function (e, f) {
					//	console.log(e,_newKeys[f])
					objToReturn[_newKeys[f]] = e;
					this.set(_newKeys[f], e);
				}, this);

				return objToReturn;
			} else {

				var cb = function cb(e) {
					//console.log("this",this)
					if (_prev[e] !== _new[e]) {
						this.set(e, _new[e]);
					}
				};

				Object.keys(_prev).forEach(cb, this);
				return _new;
			}
		} else {
			return { volume: 1, noteLength: 25, meter: 9 };
		}
	}).property(),

	volume: (function (a, _new, _prev) {
		//	console.log("volume_setter",_new)
		if (_new >= 0 && _new <= 1) {
			this.get("controllers.menu.notes").map(function (e) {
				e.volume = _new;
			});
			return _new;
		}
		if (_prev) {
			this.notifyPropertyChange("volume");
			return _prev;
		} else {
			return 0.125;
		}
	}).property("controllers.menu.notes"),

	actions: {
		urlUpdater: function urlUpdater(a) {
			//console.log('leap2')
			this.send("urlUpdater", this.getModel, a);
			return true;
		}

	} });

App.MenuController = Ember.ArrayController.extend({
	isPlaying: false,
	playProp: false,
	tope: "play",
	needs: ["console"],
	console: Em.computed.alias("controllers.console"),
	meter: Em.computed.alias("console.meter"),
	noteLength: Em.computed.alias("console.noteLength"),
	volume: Em.computed.alias("console.volume"),
	model: (function (_, _new, _prev) {
		//console.log(_new,_prev)	
		//parses url
		var _new, _newLength, objToReturn, _newKeys;
		if (_new) {
			if (_new.son) {

				//console.log('son',_new.son)	

				_new = _new.son.match(/[a-z]([\d.]){1,}/g);
				if (_new) {

					_newLength = _new.length;
					objToReturn = [];

					while (--_newLength > -1) {

						objToReturn[_newLength] = {

							sine: _new[_newLength].slice(4),
							beat: _new[_newLength][3],
							scoreIndex: _new[_newLength].slice(1, 3),
							expression: _new[_newLength][0],
							skip: true };
					}
					//console.log('son_end',objToReturn)
				} else {
					//console.log('parse error',"returning default Value")
					return [{ scoreIndex: 0, beat: 1, sine: Math.PI, expression: "sin", skip: true }];
				}
			} else {
				objToReturn = _prev;

				//console.log('_prev', objToReturn)		
				objToReturn[_new.id] = _new.context;
			}
		} else {
			objToReturn = [];
		}

		return objToReturn;
	}).property(),

	notes: (function () {

		var volume = 0.25; //this.get('volume');
		var notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88];

		notes = notes.map(function (e) {
			return play_tone(e, volume);
		});

		return notes;
	}).property(),
	actions: {
		play: function play(oldTime) {
			this.set("isPlaying", true);
			this.set("tope", "pause");
			this.send("urlUpdater", this.get("model"), this);
		},
		pause: function pause() {
			this.set("isPlaying", false);
			this.set("tope", "play");
		},

		adding: function adding() {

			var letstrythis = this.get("model").concat([{
				skip: true,
				beat: ~ ~(Math.random() * 4),
				sine: (Math.random() * 50).toPrecision(3),
				expression: ["s", "c", "l", "t"][~ ~(Math.random() * 4)],
				scoreIndex: 0
			}]);

			this.send("urlUpdater", letstrythis, this);
		}
	},
	time: function time(oldTime, count) {
		var meter = this.get("meter");
		var count = count || 3;
		//	console.log(meter)
		var oldTime = oldTime || Date.now() / 100;
		var currentTime = Date.now() / 100;
		var dT = currentTime - oldTime;
		if (this.get("isPlaying")) {
			if (dT >= meter / 4) {

				this.toggleProperty("playProp");
				//	console.log('played note')
				this.set("count", ++count % 4);
			} else {
				currentTime = oldTime;
			}
			Em.run.later(this, function () {
				Em.run(this, "time", currentTime, count);
			}, 25);
		}
	} });

App.AAComponent = Ember.Component.extend({
	layoutName: "a-great",
	classNameBindings: ["animated:enabled:disabled"],
	actions: {
		play: function play() {
			this.toggleProperty("tone");
		},
		toggle: function toggle() {
			this.toggleProperty("show");
			this.send("play");
		},
		animate: function animate() {
			this.toggleProperty("animated");
		}
	},
	show: true,
	playProp: false,
	tone: true,
	animated: false,
	beat: 1,
	sine: (function (a, b) {
		return b;
	}).property(),
	updateModel: (function (a, b) {
		//console.log("update",this.get(b))

		var index = this.get("contentIndex");
		var expression = this.get("expression")[0];
		var sine = this.get("sine");
		var skip = this.get("show");
		var beat = this.get("beat");
		var scoreIndex = this.get("scoreIndex");
		//console.log(expression,sine,skip)

		this.set("controller.model", { id: index, context: {
				skip: skip,
				expression: expression,
				sine: sine,
				beat: beat,
				scoreIndex: scoreIndex
			} });
	}).observes("sine", "expression", "show", "beat"),
	expression: (function (_, a, b) {
		if (a) if (a.length === 1) {
			return ({ s: "sin", c: "cos", t: "tan", l: "log", r: "sqrt" })[a];
		}
		return a || "atan";
	}).property(),
	names: ["sin", "cos", "tan", "log", "sqrt"],
	counts: ["0", "1", "2", "3"],
	scoreIndex: (function (a, b) {
		return ~ ~b;
	}).property()
});
//console.log('nay')

App.SubRouteService = Em.Service.extend({
	tablature: function tablature() {
		var self = this;
		console.log("D");
		Em.run(this, "clear");
		this.get("mapAllocation").forEach(function (e, x) {
			e.forEach(function (v, y) {
				Em.run(self, "dots", x, y, v);
			});
		});
		this.set("dotsIndex", 0);
	},

	muSongLength: (function () {
		return bfa.length;
	}).property(),
	muSongIndex: (function (a, b) {
		if (b < 0) {
			b = this.get("muSongLength") - 1;
		}
		b = b % this.get("muSongLength");
		this.set("controller.model.x", b);
		return b;
	}).property(),
	range: (function () {
		var range = this.get("controller.model.y")[this.get("muSongIndex")];
		return range || null;
	}).property("controller.model.x"),
	muSong: function muSong(direction) {

		var index = this[direction]("muSongIndex");
		console.log(this.get("muSongIndex"), index);
		var note = bfa[index];
		var board = this.get("mapAllocation");
		var y = 18,
		    tmp,
		    x = [],
		    range = this.get("range");
		if (range) {
			while (y--) {
				tmp = board[y].indexOf(note);
				if (tmp !== -1) {
					x.push([y, tmp]);
				}
			}
			x = [x[range]];
		} else {
			while (y--) {
				tmp = board[y].indexOf(note);
				if (tmp !== -1) {
					x.push([y, tmp]);
				}
			}
		}
		//	console.log(x+1,y,note,index)	
		if (x[0]) {
			x.forEach(function (e, f) {
				if (this.get("isCleared")) {
					Em.run(this, "clear");
				}
				Em.run(this, "dot", e[0], e[1], note);
			}, this);
		}
	},
	block: (function () {}).property("x", "y"),
	drawObserver: (function (_, x, y) {
		if (this.get("frontView")) {}
	}).observes("x", "y"),

	songLength: (function () {
		return blues[0].length;
	}).property(),
	songIndex: (function (a, b) {

		if (b < 0) {
			b = this.get("songLength") - 1;
		}
		return b % this.get("songLength");
	}).property(),
	song: function song(direction) {
		var length = blues[0].length,
		    i = this[direction]("songIndex"),
		    y = 6,
		    v,
		    x = [],
		    tmp;

		while (y--) {
			tmp = ~ ~blues[y][i];
			if (tmp) x.push([tmp - 1, y]);
		}

		if (x[0]) x.forEach(function (x, f) {
			var y = x[1],
			    x = x[0];
			v = this.get("mapAllocation")[x][y];
			//		console.log("y:",y+1,"x:",x,"note:",v,"index:",i)
			if (this.get("isCleared")) {
				Em.run(this, "clear");
			}
			Em.run(this, "dot", x, y, v);
		}, this);
	}
});

//	return this.get('mapAllocation')[this.get('x')][this.get('y')]

//		Em.run.debounce(this,'draw',7*15)

App.MountView = Em.View.extend({

	tagName: "canvas",

	attributeBindings: ["id", "style"],
	style: (function (_, y, x) {
		console.log(_, this.get("x"), this.get("y"));
		x = 40;
		y = 42;
		var v = "px;";
		return "position:absolute;" + "left:" + x + v + "top:" + y + v;
	}).property(),
	x: Em.computed.oneWay("this.controller.model.x"),
	y: Em.computed.oneWay("this.controller.model.y"),
	id: "fishing",
	notes: (function () {
		console.log("F");
		var volume = 1; //.25 //this.get('volume');

		// circle of fifths
		// 
		var notes = [261.63, 392, 293.66, 440, 329.63, 493.88, 369.99, 277.18, 415.3, 311.13, 466.16, 349.23];

		notes = notes.map(function (e) {
			return play_tone(e, volume);
		});

		return notes;
	}).property(),
	dot: function dot(x, y, i) {
		//var x,y,h,arr;
		x *= 24;
		y *= 24;
		try {
			var note = this.get("notes")[i];
		} catch (e) {
			console.log(i, this.get("notes"));
		}
		var ctx = this.get("ctx");
		var fifths = this.get("fifths"),
		    scale = 24;

		//		arr = fifths[i];
		//	console.log(arr,i,fifths)
		//			 x = arr[0]; y = arr[1]; h = arr[2];
		var h = 360 / 12 * i;
		note.volume = 0.75;
		for (var l = 0; l < 8; l++) {
			note.play();
			Em.run.later(this, function (l) {
				//	ctx.clearRect(x,y,scale/2,scale/2)

				if (note.volume >= 0.12) note.volume -= 0.12;
				ctx.fillStyle = "hsl(" + h + ",100%,50%)";
				ctx.beginPath();
				ctx.arc(x + scale / 2, y + scale / 2, scale / 2 / 8 * l, 0, 2 * Math.PI);
				ctx.fill();

				if (l === 7) {
					note.pause();
					note.volume = 0.75;
					note.currentTime = 0;
				}
			}, l, l * 15);
		}
	},
	clear: function clear(x, y) {
		this.get("ctx").clearRect(0, 0, 300, 300);
	},
	draw: function draw() {
		var type = this.get("block") ? 4 : 1;

		Em.run(this, "clear");

		if (type === 4) {
			Em.run(this, "dot", this.get("x"), this.get("y"), type);
		} else {
			Em.run(this, "dot", this.get("x") - 1, this.get("y"), 5);
			Em.run(this, "dot", this.get("x") + 1, this.get("y"), 7);
			Em.run(this, "dot", this.get("x"), this.get("y") - 1, 9);
			Em.run(this, "dot", this.get("x"), this.get("y") + 1, 11);
		}
	},
	mapAllocation: (function () {
		var map = [],
		    _x = 13,
		    _y = 6;

		while (_x--) {
			map.push([]);
			while (_y--) {
				console.log(map[10 - _x], _x);
				map[12 - _x].push(~ ~(Math.random() * 2));
			}
			_y = 6;
		}

		return map;
	}).property(),

	block: (function () {
		return this.get("mapAllocation")[this.get("x")][this.get("y")];
	}).property("x", "y"),

	drawObserver: (function (_, x, y) {
		//	console.log(_.get(x),x,y)
		if (this.get("ctx")) {
			Em.run.debounce(this, "draw", 7 * 15);
		}
	}).observes("x", "y"),

	didInsertElement: function didInsertElement() {
		var self = this;
		this.set("ctx", this.get("element").getContext("2d"));
		$(document).keydown(function (e) {

			//if(this.get('pinch')){

			//	self.toggle('pinch')

			console.log("fired");
			self.get("controller.target").send("ride", e.keyCode, self.get("x"), self.get("y"));
		});
	} });

App.MountRoute = Em.Route.extend({
	model: function model(params) {
		console.log(params);
		return params;
	},
	init: function init() {
		console.log("f");
	},

	beforeRender: function beforeRender() {
		console.log("j", this.get("model"));
	},
	renderTemplate: function renderTemplate() {
		this.render();
		console.log("D");
		this.render("nav", {
			outlet: "nav",
			into: "application" // important when using at root level
		});
	},

	actions: {

		ride: function ride(e, x, y) {
			var is;
			switch (e) {

				case 37:
					is = true;model = this.get("model");x--;break;
				case 38:
					is = true;model = this.get("model");y--;break;
				case 39:
					is = true;model = this.get("model");x++;break;
				case 40:
					is = true;model = this.get("model");y++;break;
				default:
					break;
			}
			if (is) {

				this.router.replaceWith("mount", { x: x, y: y });
			}
		} }
});

Em.Handlebars.helper("is-classy", function (index, current) {
	console.log(index, current);
	return index === current;
});

Em.Handlebars.helper("outer", function (outerParam) {
	console.log(outerParam, "filler TExT");
	return outerParam;
});

Em.Handlebars.helper("max-height", function (length) {
	var height = $("body")[0].scrollHeight / 2 / 20;
	console.log("height", height, length);
	return length > height;
});

Em.Handlebars.helper("arr-comp", function (arrOne, arrTwo) {
	debug = arrOne;
	debug2 = arrTwo;
	return arrOne === arrTwo;
});

Em.Handlebars.helper("btn-out", function (inx, bool) {
	return !bool ? inx - 1 : inx + 1;
});

Em.Handlebars.helper("btn-row", function (inx, low) {
	return inx + (low - 1);
});
Em.Handlebars.helper("chord-len", function (length) {
	console.log("helper", length);
	return length <= 5;
});

Ember.Handlebars.helper("capitalize", function (value) {
	return value.capitalize();
});
Ember.Handlebars.helper("dasherize", function (value) {
	return value.dasherize().split("-")[1] || value;
});
Ember.Handlebars.helper("propertyMe", function (value, controller) {
	return this.get("controller." + value);
});

App.ApplicationController = Em.Controller.extend({
  inut: "mea-sure",
  //  state:false,
  stats: ["resoviour"],
  belly: (function (a, b, c) {
    console.log("belly app", a, b, c);
    return "swindly";
  }).property() });

App.IndexRoute = Em.Route.extend({

  beforeModel: function beforeModel() {
    this.transitionTo("config");
  }

});
//this.transitionTo("song","edit","new")

var debug;

App.InventoryController = Em.Controller.extend({
	model: (function () {
		return Firebase.List.create({
			ref: chords
		});
	}).property(),
	selected: [],
	selectionBinding: "controllers.song.selection",
	differenceBinding: "controllers.song.difference",
	lowBinding: "controllers.song.low",
	needs: "song",
	isEditing: false,
	actions: {
		saveSelection: function saveSelection() {
			var selection = this.get("selection");
			var index = this.get("model").indexOf(selection);
			this.get("model").replace(index, 1, [this.get("selected")]);
		},
		chordCapture: function chordCapture() {
			var selection = this.get("selection");
			this.get("controllers.song").send("captureChord");
		},
		deleteSelection: function deleteSelection() {
			var selection = this.get("selection");
			this.get("model").removeObject(this.get("selection"));
		},
		editSelected: function editSelected() {
			this.toggleProperty("isEditing");
			this.send("sendSelection");
		},
		sendSelection: function sendSelection() {
			this.set("selected", Em.copy(this.get("selection")));
		},
		selector: function selector(_ref) {
			var chord = _ref.chord;
			var difference = _ref.difference;
			var low = _ref.low;

			console.log("action selector", chord);
			if (this.get("selection") === chord) {
				this.setProperties({ selection: null,
					difference: null,
					low: null });
			} else {
				this.setProperties({ selection: chord,
					difference: difference.length,
					low: low });
				if (this.get("isEditing")) {
					this.send("sendSelection");
				}
			}
		},
		toggleSelected: function toggleSelected(string, fret) {

			var arr = this.get("selected");

			if (arr[string] === fret) {
				fret = [undefined];
				if (string === 0 || string === arr.length - 1) {
					fret = null;
				}
			} else {
				fret = [fret];
			}
			arr.replace(string, 1, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("select col", string, fret);
			var arr = this.get("selected");

			if (string < 0) {
				arr.replace(0, 0, [fret]);
			} else {
				arr.replace(string - 1, 1, [arr[string - 1], fret]);
			}
		},
		appendToSelected: function appendToSelected(string, fret, offset) {
			console.log("select append", string, fret, offset);
			var arr = this.get("selected");
			if (fret === 0) {
				this.set("selected", arr.map(function (idx) {
					return idx + 2;
				}));
				fret = 1;
			}
			arr.replace(string, 1, [fret]);
		}
	}
});

App.ChordBtnComponent = Em.Component.extend({
	tagName: "td",
	classNameBindings: ["value:chordbtn"],
	value: true,
	name: "+",
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log([string, fret]);
			this.sendAction("action", string, fret);
		}
	}
});

App.ChordRowComponent = Em.Component.extend({
	tagName: "tr",
	classNameBindings: ["value:chordedit"],
	value: true,
	rows: (function (name, rows) {
		console.log(rows);
		var om = [];
		om.length = rows.length + 2;
		return om;
	}).property(),
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log("row", string, fret);
			this.sendAction("action", string, fret);
		}
	}

});

App.ArPegComponent = Em.Component.extend({
	tagName: "table",
	classNameBindings: ["isEditing"],
	isEditing: false,
	chordNotes: Em.computed.filter("chord", function (e) {
		if (e) return true;
	}),
	low: Em.computed.min("chordNotes"),
	high: Em.computed.max("chordNotes"),
	difference: (function () {
		var aom = new Date().getTime();
		Ember.run.scheduleOnce("afterRender", this, function () {

			var eom = new Date().getTime();
			console.log("after Render", eom - aom);
		});
		var leng = [];
		leng.length = Math.abs(this.get("low") - this.get("high")) + 1;
		return leng;
	}).property("high", "low"),
	click: function click() {
		console.log(" link  ");
		this.sendAction("action", this.getProperties("chord", "difference", "low"));
	},

	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log("toggleSelected", string, fret);
			this.get("higher").send("toggleSelected", string, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("appendToSelectedCol", string, fret);
			this.get("higher").send("appendToSelectedCol", string, fret, this.get("low"));
		},
		appendToSelected: function appendToSelected(string, fret) {
			console.log("appendToSelected", string, fret);
			this.get("higher").send("appendToSelected", string, fret, this.get("low"));
		}
	} });

App.ChordBodyComponent = Em.Component.extend({
	tagName: "table",
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			//			console.log([string,fret])
			this.sendAction("action", string, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("appendToSelectedCol", string, fret);
			this.sendAction("appendToSelectedCol", string, fret);
		}
	}
});

App.ANoteComponent = Em.Component.extend({
	tagName: "td",
	classNames: ["chordbtn"],
	classNameBindings: ["noteClass:hit"],
	content: (function () {
		if (this.get("noteClass")) {
			return " + ";
		} else {
			return " - ";
		}
	}).property("noteClass"),
	fret: (function (name, f) {
		return f - this.get("low");
	}).property("low"),
	note: (function (name, f) {
		return this.get("index") + this.get("low");
	}).property("low", "index"),
	noteClass: (function (name, f) {
		var notes = this.get("index"),
		    fret = this.get("fret");
		//console.log ( notes+ " notes" +" "+ fret + " fret")
		return notes === fret;
	}).property("index", "fret", "low") });

var debug2;
//		this.get('model').removeObject(this.get('selection'))

App.SongController = Em.Controller.extend({
	needs: "inventory",
	init: function init() {
		console.log("songController, INIT");
	},
	songs: (function () {

		var one = localStorage;
		console.log(one, "LOCAL STORAGE");
		return one;
	}).property(),
	onLine: (function (e, f, g) {
		console.log(f);
		return f || false;
	}).property(),
	songNames: (function () {

		return this.get("songs").names
		//return this.get('songs').names

		;
	}).property("songs"),
	editScore: (function () {

		return Em.A([[]]);
	}).property(),

	editIndex: (function (a, b) {
		if (b < 0) {
			b = this.get("editScore").length - 1;
		}

		return b % this.get("editScore").length || 0;
	}).property(),

	lyric: (function (e, f, g) {

		//	console.log(e,f,g)
		var base = this.get("editScore." + this.get("editIndex"));
		if (base) {
			//					console.log("lyric found" , base )
			return base;
		}
		return "";
	}).property("editScore", "editIndex"),
	play: (function (i, ii) {
		console.log(ii, i, "play+prop");
		if (ii[1]) {
			return ii;
		}
		return ii > -1 ? ii : [];
	}).property(),
	actions: {
		play: function play(f, g) {
			if (g) {
				this.set("play", [f, g]);
			} else {
				this.set("play", f);
			}
			console.log("play", f, g);
		},

		check: function check(value) {

			var y = this.get("model.y");
			var x = this.get("model.x");
			sub = this.get("direction");
			//	x += sub
			y[x] = value;
			this.set("model.y", y);
			this.notifyPropertyChange("model");
			console.log("check", x, this.get("model.x"), this.get("model.y"), value);
		},
		captureChord: function captureChord() {
			console.log("capture chord");
			debug = Em.copy(this.get("editScore").objectAt(this.get("editIndex"))).map(function (e) {
				return e[0] || "";
			});

			console.log(debug);
			this.get("controllers.inventory.model").addObject(debug);
		},
		save: function save() {

			var online = this.get("onLine");
			console.log(online);
			var name = this.get("model.y"),
			    tempNameCheck = undefined;
			if (online) {
				if (this.get("songNames").indexOf(name)) {
					tempNameCheck = prompt("update" + name + " " + online + "?\n(this option is secured)\n" + name + " online?");

					if (tempNameCheck === "-" + name) {
						name = this.get("model.y");
					} else {
						name = false;
					}
				} else {
					name = confirm("save" + name + " online?");
				}

				if (name) {
					Firebase.set(base.child(name), this.get("editScore"));
					this.send("ride", "edit", this.get("model.y"));
					//									this.toggleProperty('state')
					Em.run.later(function () {}, 3000);
				}
			} else {
				console.log(" F", name);
				if (localStorage[name]) {
					localStorage[prompt("update song ?", name)] = JSON.stringify(this.get("editScore"));
				} else {
					localStorage[name] = JSON.stringify(this.get("editScore"));
				}
			}
			var self = this;
			Em.run.later(function () {}, 3000);
		},

		load: function load(e, x, y) {},
		line: function line() {
			console.log("online");
			this.toggleProperty("onLine");
		},

		clear: function clear() {

			this.toggleProperty("clear");
		},

		cleared: function cleared() {

			this.toggleProperty("isCleared");
		},

		faded: function faded() {

			this.toggleProperty("isFaded");
		},

		type: function type() {
			console.log(" typeToggle");
			this.incrementProperty("playTypeToggle", 1);
			console.log(this.get("playTypeToggle"));
		},
		/*			
  				alone:function(e,f){
  		
  						console.log(this.get('editScore'),e)
  						},
  */
		songRead: function songRead(e) {

			var tab = [[], [], [], [], [], []];
			var test = e.split("\n").filter(function (e) {
				return e;
			}).map(function (e) {
				return e.substring(1, e.length);
			}).forEach(function (e, f) {
				tab[f % 6].push(e.slice(1, e.length - 1));
			});
			blues = tab.map(function (e) {
				return e.join("");
			});
			console.log(tab);
		} },
	tempo: 1250,
	clear: true,
	isCleared: true,
	isFaded: false,
	octaves: [3, 2, 1, 0],
	//		playTypeToggle:function(e,f){
	//				return f%3 || 0
	//			}.property(),
	playTypeBinding: "model.x" });

//									this.toggleProperty('state')

//							self.toggleProperty('state')

var debug;

App.ChordDashComponent = Em.Component.extend({
	tagName: "ul",
	classNames: ["sidebar", "chordBank"],
	model: (function () {
		console.log("varience of chords");
		this.get("song.chords");
		return this.get("song.chordBank"); //[[6,5,4]]
		return Firebase.List.create({
			ref: chords
		});
	}).property("song.chordBank"),
	song: Em.inject.service(),
	selected: [],
	selectionBinding: "song.chordSelection",
	differenceBinding: "song.chordDifference",
	lowBinding: "song.chordLow",
	needs: "song",
	isEditing: false,
	actions: {
		saveSelection: function saveSelection() {
			Em.run(this.get("song"), "chordSave");
		},
		updateSelection: function updateSelection() {
			/*
   var selection = this.get('selection');
   var index = this.get('model').indexOf(selection)
     var model = this.get('model')
     model.set(index,this.get('selected'))
     console.log('DEBUG SAVE')
     DEBUG = [this.get('model'),index,selection]
     */
			var index = this.get("model").indexOf(this.get("selection"));
			this.set("selection", this.get("selected"));
			this.get("model").replace(index, 1, [this.get("selected")]);
		},
		chordCapture: function chordCapture() {
			var chord = this.get("song.measure.notes").filter(function (e) {
				return e ? e : false;
			}),
			    low = Math.min.apply(this, chord),
			    high = Math.max.apply(this, chord),
			    difference = Math.abs(low - high) + 1;

			this.send("newSelection", { chord: chord, high: high, difference: difference, low: low });
		},
		newSelection: function newSelection() {
			var _ref = arguments[0] === undefined ? {} : arguments[0];

			var notes = _ref.chord;
			var high = _ref.high;
			var difference = _ref.difference;
			var low = _ref.low;

			console.log("pre-model", this.get("model"));
			notes = notes || Em.A([1, 1, 1, 1]);
			this.set("selected", notes);
			this.get("model").addObject(notes);
			this.set("selection", notes);
			console.log("chordSelection", this.get("model") || "undefined", notes || "undefined", high, difference, low);
		},
		deleteSelection: function deleteSelection() {
			var selection = this.get("selection");
			this.get("model").removeObject(this.get("selection"));
		},
		editSelected: function editSelected() {
			this.toggleProperty("isEditing");
			this.send("sendSelection");
		},
		sendSelection: function sendSelection() {
			this.set("selected", Em.copy(this.get("selection")));
		},
		selector: function selector(_ref) {
			var selection = _ref.chord;
			var difference = _ref.difference;
			var low = _ref.low;

			//			console.log ("action selector",chord)
			var isEditing = this.get("isEditing");
			if (this.get("selection") === selection) {
				if (isEditing) {
					console.log(this.get("isEditing"));
					this.toggleProperty("isEditing");
					console.log(this.get("isEditing"));
				}
				this.set("selection", null);
			} else {
				this.setProperties({ selection: selection,
					difference: difference.length,
					low: low });
				if (isEditing) this.send("sendSelection");
			}
		},
		toggleSelected: function toggleSelected(string, fret) {

			var arr = this.get("selected");

			if (arr[string] === fret) {
				fret = [undefined];
				if (string === 0 || string === arr.length - 1) {
					fret = null;
				}
			} else {
				fret = [fret];
			}
			arr.replace(string, 1, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("select col", string, fret);
			var arr = this.get("selected");

			if (string < 0) {
				arr.replace(0, 0, [fret]);
			} else {
				arr.replace(string - 1, 1, [arr[string - 1], fret]);
			}
		},
		appendToSelected: function appendToSelected(string, fret, offset) {
			console.log("select append", string, fret, offset);
			var arr = this.get("selected");
			if (fret === 0) {
				this.set("selected", arr.map(function (idx) {
					return idx + 2;
				}));
				fret = 1;
			}
			arr.replace(string, 1, [fret]);
		}
	}
});

App.ChordBtnComponent = Em.Component.extend({
	tagName: "td",
	classNameBindings: ["value:chordbtn"],
	value: true,
	name: "+",
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log([string, fret]);
			this.sendAction("action", string, fret);
		}
	}
});

App.ChordRowComponent = Em.Component.extend({
	tagName: "tr",
	classNameBindings: ["value:chordedit"],
	value: true,
	rows: (function (name, rows) {
		console.log(rows);
		var om = [];
		om.length = rows.length + 2;
		return om;
	}).property(),
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log("row", string, fret);
			this.sendAction("action", string, fret);
		}
	}

});

App.ArPegComponent = Em.Component.extend({
	tagName: "table",
	classNameBindings: ["isEditing"],
	isEditing: false,
	chordNotes: Em.computed.filter("chord", function (e) {
		if (e) return true;
	}),
	low: Em.computed.min("chordNotes"),
	high: Em.computed.max("chordNotes"),
	difference: (function () {
		var aom = new Date().getTime();
		Ember.run.scheduleOnce("afterRender", this, function () {

			var eom = new Date().getTime();
			console.log("after Render", eom - aom);
		});
		var leng = [],
		    length = Math.abs(this.get("low") - this.get("high")) + 1;
		console.log(length);

		leng.length = length;
		return leng;
	}).property("high", "low"),
	click: function click() {
		console.log(" link  ", this.get("low"));
		this.sendAction("action", this.getProperties("chord", "difference", "low"));
	},

	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			console.log("toggleSelected", string, fret);
			this.get("higher").send("toggleSelected", string, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("appendToSelectedCol", string, fret);
			this.get("higher").send("appendToSelectedCol", string, fret, this.get("low"));
		},
		appendToSelected: function appendToSelected(string, fret) {
			console.log("appendToSelected", string, fret);
			this.get("higher").send("appendToSelected", string, fret, this.get("low"));
		}
	} });

App.ChordBodyComponent = Em.Component.extend({
	tagName: "table",
	actions: {
		toggleSelected: function toggleSelected(string, fret) {
			//			console.log([string,fret])
			this.sendAction("action", string, fret);
		},
		appendToSelectedCol: function appendToSelectedCol(string, fret) {
			console.log("appendToSelectedCol", string, fret);
			this.sendAction("appendToSelectedCol", string, fret);
		}
	}
});

App.ANoteComponent = Em.Component.extend({
	tagName: "td",
	classNames: ["chordbtn"],
	classNameBindings: ["noteClass:hit"],
	content: (function () {
		if (this.get("noteClass")) {
			return " + ";
		} else {
			return " - ";
		}
	}).property("noteClass"),
	fret: (function (name, f) {
		return f - this.get("low");
	}).property("low"),
	note: (function (name, f) {
		return this.get("index") + this.get("low");
	}).property("low", "index"),
	noteClass: (function (name, f) {
		var notes = this.get("index"),
		    fret = this.get("fret");
		//console.log ( notes+ " notes" +" "+ fret + " fret")
		return notes === fret;
	}).property("index", "fret", "low") });

var debug2;
/*	this.setProperties({'selection': null,
                                 'selected'	:null,
				   	   	'difference':null,
						'low':null})
                                */

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

App.FretBoardComponent = Em.Component.extend({
	names: ["backView", "frontView", "centerView"],
	classNames: ["tablet"],
	mouseFormat: function mouseFormat(E) {
		var _temp, _temp2;

		//console.log( this.get('element').offsetTop,"OFFSETTOP")
		var x = E.offsetX == undefined ? E.pageX - (this.get("element").offsetLeft + 40) : E.offsetX;
		var y = E.offsetY == undefined ? E.pageY - this.get("element").offsetTop : E.offsetY;

		E = (_temp = [~ ~((x - 10) / (1472 / 23)), ~ ~((y - 5) / (300 / 6))], _temp2 = _slicedToArray(_temp, 2), x = _temp2[0], y = _temp2[1], _temp);
		return E;
	},
	globalKeydown: Em.inject.service(),
	didInsertElement: function didInsertElement() {
		var _this = this;

		this.get("song.measure");
		//   console.log('getting it in',this.get('element'),this.get('foreGround'))
		//    	this.set('frontView',this.get('element').getContext('2d'))	 
		$(document).keydown(function (e) {
			return Em.run(_this, _this.get("globalKeydown.begin"), e);
		});
	},
	willDestroyElement: function willDestroyElement() {
		//   console.log( 'destroy, view')
		$(document).off("keydown");
	},
	mouseMoveBinding: "mouseSelection",
	mouseSelection: (function () {
		console.log("moving");
		if (this.get("song.chordSelection")) return this.get("console");
		return null;
	}).property("song.chordSelection"),
	console: function console(e) {
		Em.run.throttle(this, "chordHover", e, 2);
	},
	click: function click(e) {
		//   console.log( ' begin ' )
		if (this.get("song.chordSelection")) {
			Em.run.once(this, "pushChord", e);
		} else {
			Em.run.once(this, "prePushEdit", e);
		}
	},
	mouseLeave: function mouseLeave() {
		if (this.get("song.chordSelection")) {
			Em.run.once(this.get("options"), "clear");
		}
	},
	prePushEdit: function prePushEdit(e) {
		var f = Em.run(this, "mouseFormat", e);
		var measure = this.get("song.measure");

		this.set("song.debug", f);
		//    console.log(f,this.get('song.score').objectAt(this.get('song.index')).notes.toString())

		measure.notes.replace(f[1], 1, f[0]);
		Em.run(this.get("song"), "update", measure.notes);
	},
	playNotes: (function () {
		var _this = this;

		var chord = this.get("song.measure.notes");
		console.log("tempChord", chord.toString());
		var x = 67;
		y = 50;
		offset = 18, rate = 24, tempo = ~ ~(this.get("song.tempo") / 50), scale = 36, note = this.get("tones.tone"), tempChord = this.get("song.cacheNotes"), index = ~ ~this.get("song.index").toString(), ctx = this.get("options.frontView");
		rate = ~ ~(tempo / 2) - 1;
		this.set("song.measure.debug", [tempo, rate].toString());
		ctx.clearRect(0, 0, 1400, 300);
		note.setEach("freq", 0);
		note.setEach("ctx.gain.value", 0.1);
		//     console.log("premap",chord)
		chord = chord.map(function (e, f) {
			if (e) {
				note.objectAt(f).set("freq", e);
				return [offset + e * x + scale / 2, offset / 2 + y * f + scale / 2];
			} else {
				note.objectAt(f).pause();
			}
		}).filter(function (e) {
			return e ? e : false;
		});
		this.set("song.cacheNotes", chord);

		//      //console.log('postPut',chord,this.get('song.cacheNotes'),this.get('song.measure.notes'))

		for (var l = 0; l < rate; l++) {
			Em.run.later(this, function (l) {
				window.requestAnimationFrame(function () {
					tempChord.map(function (_ref) {
						var _ref2 = _slicedToArray(_ref, 2);

						var fret = _ref2[0];
						var string = _ref2[1];
						return ctx.clearRect(fret - scale / 2, string - scale / 2, scale, scale);
					});
					if (_this.get("song.index") === index) {
						//            console.log(index,this.get('song.index'))
						ctx.beginPath();
						chord.map(function (_ref) {
							var _ref2 = _slicedToArray(_ref, 2);

							var fret = _ref2[0];
							var string = _ref2[1];

							ctx.arc(fret, string, scale / 2 / rate * l, 0, 2 * Math.PI);
							ctx.closePath();
						});
						ctx.fill();
					}
				});
			}, l, tempo * l);
			//(Math.sin(60/l)+1)*l*tempo);
		}

		console.log("tempChord_2", this.get("song.measure.notes").toString());
	}).observes("song.measure.notes.@each"),
	pushChord: function pushChord(e) {
		var arr = this.get("song.chordSelection");var x = this.get("cacheX");

		var y = this.get("cacheY");
		var low = this.get("song.chordLow");
		var diffX = ~ ~(this.get("song.chordDifference") / 2 - 0.5);
		var diffY = ~ ~(arr.length / 2);
		var theArr = arr.map(function (e) {
			return e - low + x - diffX;
		});
		var measure = this.get("song.measure");

		while (y--) {
			theArr.unshift(0);
		}
		while (diffY--) {
			theArr.shift();
		}
		while (theArr.length < 6) {
			theArr.push(0);
		}
		theArr = theArr.slice(0, 6);

		this.set("song.measure.notes", theArr.map(function (e, f) {
			return e ? e : measure.notes[f];
		}));
	},

	editPush: function editPush(notes) {
		var pos = this.get("song.score")[this.get("song.index")],
		    name = Object.keys(notes)[0];
		//		console.log( this.get('song.score'),pos,"index: " +  this.get('song.index') , notes )
		if (pos) {
			if (!pos[name]) {
				//console.log( "add" ,name,notes[name]) 				
				pos[name] = notes[name];
				Em.run(this, "dot", notes[name][0], name, notes[name][1]);
			} else {
				//console.log( "remove" + name )
				//				Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
				Em.run(this, "erase", 67 * notes[name][0], 50 * name, "frontView");

				//				Em.run(this,'dot',pos[name][0],name,pos[name][1],true)
				Em.run(this, "erase", 67 * pos[name][0], 50 * name, "frontView");

				delete pos[name];
			}
		} else {
			this.get("song.score").push(notes);
		}
		//					console.log(this.get('song.score'),pos,name)
		//Em.run(this,'dot',notes[name][0],name,notes[name][1],true)
		Em.run(this, "erase", 67 * notes[name][0], 50 * name);
	},
	chordTemp: [],
	tempChord: [],

	chordHover: function chordHover(e) {
		var arr = this.get("song.chordSelection");
		var low = this.get("song.chordLow");
		var _Em$run = Em.run(this, "mouseFormat", e);

		var _Em$run2 = _slicedToArray(_Em$run, 2);

		var x = _Em$run2[0];
		var y = _Em$run2[1];

		if (x !== this.get("cacheX") || y !== this.get("cacheY")) {

			this.setProperties({ cacheX: x, cacheY: y });
			console.log(x, y, "cache", arr);
			var diffX = ~ ~(this.get("song.chordDifference") / 2 - 0.5);
			var diffY = ~ ~(arr.length / 2);

			////console.log(diffX,diffY,this.get('controller.difference'))
			/*
        chord = chord.map((e,f) => { 
                   if(e){
                     note.objectAt(f).set('freq',e)
                     return  [ offset+(e*x)+scale/2,
                               offset/2+(y*f)+scale/2
                             ]
                   }else{note.objectAt(f).pause()}
                   }).filter(e => e?e:false)
     */
			arr = arr.map(function (fret, string) {
				fret -= low;
				fret += x;
				string += y;
				fret -= diffX;
				string -= diffY;
				fret *= 67;
				string *= 50;
				return [fret, string];
			});
			Em.run(this, "dotChord", arr);
		}
	},

	dotChord: function dotChord(chord) {

		var offset = 18,
		    scale = 36,
		    l = 8,
		    chordTemp = this.get("chordTemp"),
		    ctx = this.get("options.centerView");

		chordTemp.map(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2);

			var fret = _ref2[0];
			var string = _ref2[1];
			return ctx.clearRect(fret + scale / 2, string, scale, scale + offset);
		});
		//chordTemp.map(([fret,string]) => ctx.clearRect(fret-scale/2,string-scale/2,scale,scale))
		/*
  for(var [x,y] of this.get('chordTemp')){
  Em.run(this,"erase",x+8,y+8,'options.centerView')
  }
  	*/
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "white";

		/* 
         ctx.beginPath()
     	        chord.map(([fret,string]) => {  
                    ctx.arc(fret,	string,	((scale/2)/rate)*l,	0,2*Math.PI)
                    ctx.closePath();
                        })
  			  	ctx.fill()
  */
		for (var _iterator = chord[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
			var _step$value = _slicedToArray(_step.value, 2);

			var x = _step$value[0];
			var y = _step$value[1];

			ctx.beginPath();
			ctx.arc(offset + x + scale / 2, offset / 2 + y + scale / 2, scale / 2 / 8 * l, 0, 2 * Math.PI);
			ctx.fill();
		}
		this.set("chordTemp", chord);
		ctx.globalAlpha = 1;
	},
	tones: Em.inject.service(),
	clearObserver: (function () {
		Em.run.next(this, "clear");
	}).observes("controller.clear"),
	clear: function clear() {
		var ctx = arguments[0] === undefined ? "options.frontView" : arguments[0];

		this.get(ctx).clearRect(0, 0, 1400, 300);
	},
	volume: 0.25

});
//     console.log("pushMeasure",measure,this.get('song.score').objectAt(this.get('song.index')))

//			Em.run(this,'editPush',obj)
//    this.set('song.measure.debug',["X",diffX,"low",low].toString())
//console.log(arr.toString(), x,y, theArr.toString(),"|",this.get('song.measure.notes').toString())

/*
 			var chord = this.get('chordTemp'),noteMap = this.get('mapAllocation');
				
				pos =  this.get('song.score')[this.get('song.index')];

//			chord = chord.map(([x,y])=>[x,y,noteMap[x/67][y/50]])
//			console.log( "__CHORD___",chord) 
			for(var [x,y] of chord){
				x/=67;
				y/=50;
				pos[y] = [x,noteMap[x][y]]
			}
			
			Em.run(this,'edit',null,this.get('song.index')) 
     */

App.InstrumentComponent = Em.Component.extend({
	name: null,
	tagName: "canvas",
	classNames: ["tablature"],

	height: 300,
	width: 1472,

	attributeBindings: ["id", "style", "height", "width"],
	style: (function (_, y, x) {
		//		console.log(_,this.get('x'),this.get('y'))
		x = 100;
		//				x = 1220;
		y = 360;
		var v = "px;";
		var p = "%;";
	}).property(),

	didInsertElement: function didInsertElement() {
		var name = this.get("name"),
		    ctx = this.get("element").getContext("2d");

		this.set(name, ctx);
		ctx = this.get(name);

		this.get("parentView.options").set(name, ctx);
	},
	frontView: (function (a, ctx) {
		if (ctx) {
			ctx.font = "bolder 22px serif";
			ctx.fillStyle = "white"; //"rgba(155,155,155,.79)"
			ctx.strokeStyle = "white";
		}
		return ctx || null;
	}).property(),
	centerView: (function (a, ctx) {
		if (ctx) {
			ctx.font = "bolder 22px serif";
		}
		return ctx || null;
	}).property(),
	backView: (function (a, b) {
		var twentyFour = 24,
		    width = this.get("width"),
		    dots = 2,
		    size = Math.ceil(1600 / 24),
		    fret = new Image();
		fret.src = "images/fret.jpg";
		console.log(width);
		//			fret.src = "lightning.svg";
		fret.onload = function () {
			b.fillStyle = "#012";
			//		b.fillRect(0,0,1600,300);
			b.fillRect(0, 0, width, 300);
			b.globalAlpha = 0.65;
			b.save();
			b.translate(0, 300);
			b.scale(1, -1);
			b.globalCompositeOperation = "lighter";
			while (dots--) {}
			//		b.drawImage(fret,2905,300)
			b.restore();
			b.fillStyle = "rgba(44,77,150,.122)";
			b.lineWidth = "5";
			b.beginPath();
			b.moveTo(770, 160);
			b.lineTo(795, 160);
			b.lineTo(745, 80);
			b.lineTo(765, 140);
			b.lineTo(740, 140);
			b.lineTo(790, 220);
			b.closePath();
			b.fill();
			b.fillStyle = "#333333";
			//b.stroke()

			dots = 4;
			while (twentyFour--) {

				b.fillStyle = "hsl(180,11%,32%)";
				b.fillRect(size * twentyFour, 0, 9, 300);
				b.fillStyle = "hsl(180,11%,42%)";
				b.fillRect(size * twentyFour + 2, 0, 5, 300);
			}

			b.fillStyle = "hsl(180,11%,32%)";
			while (dots--) {
				b.beginPath();
				b.arc(size * 2.5 + 3 + dots * size * 2, 150, 16, 0, 2 * Math.PI);
				b.fill();
			}
			dots = 4;
			while (dots--) {
				b.beginPath();
				b.arc(size * 14.5 + 3 + dots * size * 2, 150, 16, 0, 2 * Math.PI);
				b.fill();
			}
			dots = 2;

			while (dots--) {
				b.beginPath();
				b.arc(size * 11.5 + 3, 75 + 150 * dots, 16, 0, 2 * Math.PI);
				b.fill();
			}

			twentyFour = 6;
			while (twentyFour--) {
				b.fillStyle = "hsl(0,0%,5%)";
				b.fillRect(0, 22 + 50 * twentyFour, width, 6);
				b.fillStyle = "hsl(0,0%,40%)";
				b.fillRect(0, 24 + 50 * twentyFour, width, 3);
			}
		};
	}).property() });

//		b.drawImage(fret,600*dots,0,600,488)

App.LogInComponent = Em.Component.extend({
  variab: "TRICK:",
  actions: {
    logout: function logout() {
      this.sendAction("logout");
    },
    login: function login() {
      this.sendAction("login");
    }
  }
});

App.MeasureBarComponent = Ember.Component.extend({
  classNames: ["scroll", "sidebar"],
  time: Em.computed.oneWay("controller.editScore.length"),
  tagName: "ul",
  attributeBindings: ["dims:style"],
  dims: (function (i, ii, iii) {
    var height = $(document).height(),
        width = (this.get("width") || 1) * ~ ~(height / 18) + "px";
    console.log(height, width);
    return "height:" + height + "px;width:" + width;
  }).property("width"),
  range: [1, 2, 3, 4],
  isActive: (function () {
    console.log("F");
  }).property(),
  content: (function () {
    console.log("controller");
    return this.get("controller.editScore") || [];
  }).property("controller.editScore") });

App.LMeasureComponent = Ember.Component.extend({
  classNameBindings: "active:hit",
  tagName: "li",
  measure: (function (measure) {
    measure = this.get("index").toString();
    if (measure[1]) {
      return measure;
    }
    return "0" + measure;
  }).property("index"),
  click: function click(e, f) {
    var ii = this.get("index");
    //		this.set('parentView.controller.editIndex',ii)
    //		this.get('parentView.controller').send('play',ii)

    this.set("parentView.song.index", ii);
  } });

App.LiController = Ember.Controller.extend({
  needs: ["application"],
  isActive: (function () {
    return this.get("controllers.application.active") === this.get("model.name");
  }).property("controllers.application.active")
});

App.LyricsPaneComponent = Ember.Component.extend({
  classNames: "lyrics",
  song: Em.inject.service()
});

App.MenuBarComponent = Em.Component.extend({
	//	classNameBindings:['col-lg-12'],
	menubar: "menubar",
	barVisible: true,
	sidebar: "sidebar",
	active: "song",
	actions: {
		click: function click() {
			this.toggleProperty("barVisible");
		},
		forActive: function forActive(e) {
			//	console.log(e)
			//	this.notifyPropertyChange('active')
			this.set("active", e);
		}
	},
	menuArray: [],
	menuBar: (function () {
		var _this = this;

		this.get("logger.menuBar").then(function (data) {
			return _this.set("menuArray", data);
		});
	}).on("init") });
//	console.log(this.get('active'))

App.OptionPanelComponent = Em.Component.extend({
  tagName: "ul",
  classNames: ["nav", "sidebar"],
  options: Em.inject.service(),
  actions: {
    actionHandler: function actionHandler(name) {
      console.log("actionHAndler", name);
      Em.run(this.get("options"), name);
    }
  },
  didInsertElement: function didInsertElement() {
    this.set("controller.belly", Ember.Binding.from("parentView.controller.belly").to("controller.belly"));
    //this.set('controller.state',Ember.Binding.from("parentView.controller.state").to("controller.state"))
    this.get("controller.belly").connect(this);
    //this.get('controller.state').connect(this)	
    console.log(this.get("controller.belly"));
  } });

App.PlayBarComponent = Em.Component.extend({
	actions: {
		back: function back() {
			console.log("back ");
			ctrl.send("play", true, "decrementProperty");
		},
		stepLeft: function stepLeft() {
			console.log("stepLeft ");
			this.decrementProperty("song.index");
		},
		stepRight: function stepRight() {
			console.log("stepRight ", this.get("song.index"));
			this.incrementProperty("song.index");
		},
		play: function play() {
			console.log("play ", this.get("song.pause"));
			this.toggleProperty("song.pause");
		} }

});

App.SidebarComponent = Em.Component.extend({});

App.LyricsView = Em.View.extend({});

App.CoreComponent = Ember.Component.extend({
		//	classNames:['platformer'],
		tagName: "span",
		layout: (function () {
				return Em.Handlebars.compile("<button {{action 'click' name }} >{{name}}</button>");
		}).property(),
		colors: (function () {
				return ["hi", "lo", "match"][this.get("value") % this.get("inc")];
		}).property("value"),
		actions: {
				click: function click(name) {
						console.log("click", name);
						//           Em.run(this.get('options'),name)
						this.get("ctrl").send("actionHandler", name);
				}
		}
});
App.CheckComponent = Em.Checkbox.extend({
		checkedBinding: "option",
		optionsCheck: (function () {
				return this.get("parentView.options").get(this.get("name"));
		}).property("option"),
		name: (function (e, f, g) {
				this.set("option", Em.computed.alias("parentView.options.song." + f));
				return f;
		}).property() });
App.SwitchComponent = Em.Select.extend({
		content: ["edit", "muSong", "song"],
		valueDidChange: (function (a, b, c) {
				console.log(a, b, c);
		}).observes("value")
});

App.LabelForComponent = Em.Component.extend({
		tagName: "label",
		attributeBindings: ["for"]
});

App.OctavesController = Ember.Controller.extend({
		needs: ["song"],
		x: Em.computed.alias("controllers.song.model.x"),
		y: Em.computed.alias("controllers.song.model.y"),
		isActive: (function () {}).property("x,y")
});
//			this.get('controller').send('ride',this.get('value'),this.get('controller.model.y'))

//	console.log('octave',~~this.get('y')[this.get('x')],this.get('x'))
//   return ~~this.get('y')[this.get('x')] === this.get('model');
