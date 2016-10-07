ul class=menubar
  li{action 'click'}
    h2 &#127913;
  if barVisible
    if song.routes.isFulfilled
      each song.routes as |page|
        li
          if page.x
            link-to page.name (concat "isOnline." page.route) isOnline page.y tagName="div"
          else
            link-to page.name page.route tagName="div"
  else
    /note-type
    if song.selected.isFulfilled
      li: h2: =song.selected.selection
      each songOptions as | path |
        li class="{{if (e-q isActive.option path) hit}}":  link-to path (concat "isOnline.song." path ) isOnline song.selected.selection tagName="div"
      li: h1: |_ 
      each songToggles as | bool |
        =toggle-button bool=(get song bool)
          =bool


