.panel.panel-default
  h3.panel-heading Instruments
  ul.list-group.panel-body
    if song.instrumentNames.isFulfilled
      each configuration in song.instrumentNames
        li.list-group-item
          span.badge = configuration.name
          .panel-body
            boolean-switch bar=configuration update=song.instrumentNames.update
              | {{configuration.name}}
