if song.isExplain
  img src='/images/{{get images imageIndex}}.jpg'
  countdown-pane [
    song=song
    width=500
    height=1
    action=(action 'incInd')
  ]
