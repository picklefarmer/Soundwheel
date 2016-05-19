.panel.panel-default
  h3.panel-heading Instruments
  ul.list-group.panel-body
    if song.instrumentNames.isFulfilled
      each song.instrumentNames as |configuration|

        li.list-group-item
          span.badge = configuration.name
          .panel-body
            boolean-switch bar=configuration main=song.instrumentNames
              | {{configuration.name}}
