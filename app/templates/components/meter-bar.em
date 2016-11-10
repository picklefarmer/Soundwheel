//each timeSignature as |beat index|
each song.selected.measure.map as |type index|
  =beat-part  [
    index=('array-me' index)
    boundValue=song.beat
    beatType=type
    highlight=('is-classy' index song.beatInputIndex)
  ]

/highlight=('of-array' index song.beatInputIndex)
