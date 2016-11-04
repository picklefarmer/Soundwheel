.panel-body
  .list-group 
    each list as |string index|
      .list-group-item
        .panel-body
          select-me action=(action 'updater' name index) class="form-control" selection=string content=modContent
          span.float.badge: =index
