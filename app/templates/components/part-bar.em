if song.selected.isFulfilled
  each song.selected.partOrder as |color measure|
    part-part [
      active=("is-classy" measure song.selected.partIndex)
      highlight=("is-classy" measure song.inputIndex)
      index=measure
      beatType=0
      measure=(get song.selected.partNames (concat "" color.index))
      boundValue=song.selected.partIndex
    ]
