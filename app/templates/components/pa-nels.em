.panel.panel-default
  h3 Panel Layout
  ul.list-group.panel-body
    if song.panels.isFulfilled
      each song.panels as |configuration|
        li.list-group-item
          span.badge {{caps-please configuration.name}}
          .panel-body
            select-me class="form-control" content=panelOptions selection=configuration.options
            toggle-me isEnabled=configuration.enabled
