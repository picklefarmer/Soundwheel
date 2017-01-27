if song.panels.isFulfilled
  tool-bar [
    model=model
    source=song.panels
    base=target.currentPath
    updateUrl="updateUrl"
    ]
    display-table: .menu-bar: =play-bar [
      playbar=true
      base=target.currentPath
      ]
    .lips: =outlet
/back-ground
