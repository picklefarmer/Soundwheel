.panel.panel-default
  h3.panel-heading Main
  ul.list-group.panel-body
    with song.main as |up|
      if up.isFulfilled
        each up.list as |configuration|
          li.list-group-item
            span.badge = configuration.name
            .panel-body
              with (type-of configuration.options) as |type|
                =type
                component [
                  type
                  class='form-control'
                  target=song.main
                  list=configuration.options
                  content=(get up (concat configuration.name 'Arr'))
                  ]
