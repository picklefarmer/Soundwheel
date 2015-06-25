.panel.panel-default
  h3.panel-heading Main
  ul.list-group.panel-body
    if song.main.isFulfilled
      each configuration in song.main
        li.list-group-item
          span.badge = configuration.name
          .panel-body
            boolean-switch bar=configuration update=song.main.update
              | {{configuration.name}}
