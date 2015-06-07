.row
  .column.large-2.large-centered
    h1{action 'login'} = auth.uid
.row
  .column.large-4
    .panel.panel-default
      .panel-heading 
      |Stuff
      .panel-body
        ul.list-group
          li.list-group-item
            span.badge{action 'login'} LOGIN
            .panel-body Things
          li.list-group-item
            span.badge{action 'logout'} LOGOUT
            .panel-body Things
          each song in auth.songList
            li.list-group-item
              span.badge 1
              .panel-body = song
