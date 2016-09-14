if song.isBeat
  each timeSignature as |beat index|
    =beat-part  index=beat boundValue=song.beat beatMap=song.selected.measure.map
