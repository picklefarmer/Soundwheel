ul class=menubar
  li{action 'click'}
    h1.dino: =clock
    // &#x2609;
  if song.selected.isFulfilled
    li: h1 &#x2637;
    li: h1: =titleTask
    li: h1 &#x2637;
  if barVisible
    if song.routes.isFulfilled
      li: link-to [
        'song'
        'isOnline.song.edit'
        isOnline
        song.selected.selection
        tagName="div"
        ]
      each song.routes as |page|
        li
          if page.y
            link-to page.name (concat "isOnline." page.route) isOnline page.y tagName="div"
          else
            link-to page.name page.route tagName="div"

  else

      span
        each songOptions as | path |
          li class="{{if (e-q isActive.option path) hit}}":  link-to path (concat "isOnline.song." path ) isOnline song.selected.selection tagName="div"
      li: h1 &#x2637;
      li: =points-pane
      /each songToggles as | bool |
        =toggle-button name=bool bool=(get song bool)
          =bool

unless barVisible
  /ul.menubar: =play-bar playbar=true tagName="li"
  =display-table
    =play-bar playbar=true tagName="div" 
