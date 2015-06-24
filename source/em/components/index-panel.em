h1 HI
.panel.panel-default
  h3.panel-heading Main
  ul.list-group.panel-body
    if song.main.isFulfilled
      each configuration in song.main
    li.list-group-item
      configuration
      span.badge = configuartion.name
      .panel-body
        boolean-switch bar=configuration
          | {{configuration.name}}
