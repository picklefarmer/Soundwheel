    .panel.panel-default
      h3.panel-heading Panel Layout
      ul.list-group.panel-body
        each bar in settings.datas
          li.list-group-item
            span.badge = bar.name
            | {{capitalize bar.name}} Panel
            .panel-body
              view "select" content=settings.menuBars value=bar.panel
              boolean-switch bar=bar
              bar.checked
