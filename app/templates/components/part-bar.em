if song.selected.isFulfilled

  each song.selected.composition as |color measure|

    part-part [
      song=song
      current=("is-classy" measure song.selected.compIndex)
      highlight=("is-classy" measure song.partInputIndex)
      index=measure
      beatType=false
      part=color
      boundValue=song.selected.compIndex
    ]
