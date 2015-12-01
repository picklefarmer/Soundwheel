.panel-body
  span.float.right
    if selection
      = selection
    else
      = bar.options
  /view "select" content=range value=selected
