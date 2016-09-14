if song.selected.isFulfilled
	each song.selected.hex as |color measure|
		l-measure active=("is-classy" measure song.beat) index=measure boundValue=song.beat
