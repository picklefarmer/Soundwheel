if song.isBeat
  //each timeSignature as |beat index|
  each song.selected.measure.map as |type index|
    =beat-part  [
      index=('array-me' index)
      boundValue=song.beat
      beatType=type
      highlight=('is-classy' index song.beatInputIndex)
    ]

.beat-blanket
  each song.measureKit as |kitBin index|
    =beat-bar  [
      index=index
      boundValue=song.beat
      kitBin=(mut kitBin)
    ]

    /highlight=('of-array' index song.beatInputIndex)
