if song.panels.isFulfilled
  each song.panels as |panel|
    if panel.enabled
      |<div class='{{panel.options}}Full'>{{component panel.name}}</div>
      /|<div class='{{panel.options}}Full {{if panel.enabled "autohide"}}'>{{component panel.name}}</div>
