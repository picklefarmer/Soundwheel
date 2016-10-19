if song.selected.isFulfilled
  each song.selected as |color measure|
    l-measure active=("is-classy" measure song.selected.index) index=measure boundValue=song.selected.index
