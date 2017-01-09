if song.tipJar.isFulfilled
  if tipClass
    h1: =tipClass.name
    h4: =tipClass.desc
  else
    =yield


