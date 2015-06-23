    .panel.panel-default
      h3.panel-heading Panel Layout
      ul.list-group.panel-body
        if song.panels.isFulfilled
          each bar in song.panels
            li.list-group-item
              span.badge = bar.name
              | {{capitalize bar.name}} Panel
              .panel-body
                view "select" content=song.panels.menuBars value=bar.panel
                boolean-switch bar=bar
                bar.checked
