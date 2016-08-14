if song.isBeat
  each timeSignature as |beat index|
    =l-measure active=("is-classy" index song.beat) index=beat boundValue=song.beat
