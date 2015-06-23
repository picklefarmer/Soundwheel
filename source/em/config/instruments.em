.panel.panel-default
      h3.panel-heading Panel Layout
      ul.list-group.panel-body
        if configPanel.isFulfilled
          each configuration in configPanel
            li.list-group-item
              span.badge = configuartion.name
              .panel-body
                boolean-switch bar=configuration
