if song.panels.isFulfilled
  tool-bar [
    model=model
    source=song.panels
    updateUrl="updateUrl"
    ]
    display-table: .menu-bar: =play-bar [
      playbar=true
      base=target.currentPath
      ]
    outlet
/back-ground
