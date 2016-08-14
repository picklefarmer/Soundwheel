ul class=menubar
  li{action 'click'} (----------------O)
  if barVisible
    if song.routes.isFulfilled
      each song.routes as |page|
        li{action "forActive" page.name} class="{{page.isActive:round}}"
          if page.x
            link-to page.name page.route page.x page.y tagName="div"
          else
            link-to page.name page.route tagName="div"
  else
    | placeHolder

