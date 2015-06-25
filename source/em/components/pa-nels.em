    .panel.panel-default
      h3.panel-heading Panel Layout
      ul.list-group.panel-body
        if song.panels.isFulfilled
          each configuration in song.panels
            li.list-group-item
              span.badge = configuration.name
              | {{capitalize configuration.name}} Panel
              .panel-body
                view "select" content=song.panels.menuBars value=configuration.options
                boolean-switch bar=configuration update=song.panels.update
                  | Auto-hide
