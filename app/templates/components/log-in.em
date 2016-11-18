.row
  .column.large-2.large-centered
.row
  .column.large-4
    .panel.panel-default
      .panel-heading 
        if auth.uid
          img class='badge icon' src=auth.photoURL
          h3 Welcome {{displayName}}
      .panel-body
        ul.list-group
          unless auth.uid
            li.list-group-item
              span.badge{action 'login'} LOGIN
              .panel-body 
                a.btn.btn-success{action 'login'} Login
          li.list-group-item
            span.badge{action 'logout'} LOGOUT
            .panel-body 
              a.btn.btn-danger{action 'logout'} Logout
          each auth.songList as |song|
            li.list-group-item
              span.badge 1
              .panel-body = song
