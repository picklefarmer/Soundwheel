if song.selected.isFulfilled
  each song.selected.playOrder as |color measure|
    part-part [
      active=("is-classy" measure song.selected.partIndex)
      highlight=("is-classy" measure song.inputIndex)
      index=measure
      beatType=0
      measure=(get song.selected.partNames (concat "" color))
      boundValue=song.selected.partIndex
    ]
