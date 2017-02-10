each song.selected.measure.map as |type index|
  =beat-part  [
    index=('array-me' index)
    boundValue=song.beat
    background=song.main.bankmoji.options
    beatType=type
    click=(action 'valueUp' index)
    highlight=('is-classy' index song.beatInputIndex)
  ]
