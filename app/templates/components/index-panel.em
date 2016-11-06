.panel.panel-default
  h3.panel-heading
    |Main
    .float-right: =action-property [
      action=(action 'saveToStorage' target=song)
      name="main"
      desc="Save Settings"
    ]
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
                  name=configuration.name
                  target=song.main
                  list=configuration.options
                  selected=(mut configuration.options)
                  content=(get up (concat configuration.name 'Arr'))
                  ]
