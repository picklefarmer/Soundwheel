.panel-body
  .list-group 
    each list as |string index|
      .list-group-item
        .panel-body
          select-me class="form-control" selection=string content=content
          span.float.badge: =index
