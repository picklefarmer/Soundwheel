if song.selected.isFulfilled
	each song.selected.hex as |color measure|
		l-measure active=("e-q" measure song.beat) index=measure boundValue=song.beat
