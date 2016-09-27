if song.panels.isFulfilled
  each song.panels as |panel|
    if (e-q panel.options 'middle')
      |<div class='{{panel.options}}Full {{if song.options.verticalTab "verticalTab" }} {{if panel.enabled "autohide"}}'>{{component panel.name}}</div>
    else
      |<div class='{{panel.options}}Full {{if panel.enabled "autohide"}}'>{{component panel.name}}</div>
      /if panel.enabled
        |<div class='{{panel.options}}Full'>{{component panel.name}}</div>

