if song.selected.isFulfilled

  each song.selected.partOrder as |color measure|

    part-part [
      song=song
      current=("is-classy" measure song.selected.compIndex)
      highlight=("is-classy" measure song.inputIndex)
      index=measure
      beatType=false
      measure=(get song.selected.partNames (concat "" color.index))
      boundValue=song.selected.compIndex
    ]
