.panel-body
  each list as |string index|
    .panel-body
      span.float.right: =index
      select-me class="form-control" selection=string content=content
