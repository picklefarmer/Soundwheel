.row
  .column.large-2.large-centered
    h1{action 'login'} = auth.uid
.row
  .column.large-4
    .panel.panel-default
      .panel-heading 
        if auth.uid
          h3 Welcome {{auth.uid}}
      .panel-body
        ul.list-group
          li.list-group-item
            span.badge{action 'login'} LOGIN
            .panel-body 
              a.btn.btn-success{action 'login'} Login
          li.list-group-item
            span.badge{action 'logout'} LOGOUT
            .panel-body 
              a.btn.btn-danger{action 'logout'} Logout
          each song in auth.songList
            li.list-group-item
              span.badge 1
              .panel-body = song
