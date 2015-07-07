.panel.panel-default
  h3.panel-heading Main
  ul.list-group.panel-body
    if song.main.isFulfilled
      |thing
      each configuration in song.main.list
        li.list-group-item
          span.badge = configuration.name
          .panel-body
            |{{log configuration}}
            option-type bar=configuration update=song.main.update range=(lookUp song.main configuration.name)
                | {{configuration.name}}
