if song.tipJar.isFulfilled
  if tipClass.name
    h1 canon=glyph
      =tipClass.name
    h4: =tipClass.desc
  else
    =yield


