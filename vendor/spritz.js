function word_show(i) {
  $('#spritz_progress').width(100*i/words.length+'%');
  var word = words[i];
  var stop = Math.round((word.length+1)*0.4)-1;
  $space.html('<div>'+word.slice(0,stop)+'</div><div>'+word[stop]+'</div><div>'+word.slice(stop+1)+'</div>');
}
