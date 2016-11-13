if song.selected.isFulfilled
  each song.selected.part.fretboard as |color measure|
    l-measure [
      current=("is-classy" measure song.selected.index)
      highlight=("is-classy" measure song.inputIndex)
      index=measure
      boundValue=song.selected.index
    ]
