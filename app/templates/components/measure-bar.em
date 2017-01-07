if song.selected.isFulfilled
  each song.selected.part.fretboard.content as |color measure|
    l-measure [
      current=("is-classy" measure song.selected.index)
      highlight=("is-classy" measure song.inputIndex)
      measure=(get beatMask (concat '' measure))
      index=measure
      click=(action 'valueUp' measure)
    ]
