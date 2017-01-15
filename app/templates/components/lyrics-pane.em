if song.selected.isFulfilled
    unless full
      if song.isPart
        each-in song.selected.lyrics as |key|
          =span-me [
            tabIndex=1
            upload=(action 'update' song.selected.partInstance song.selected.instance key)
            value=(mut (get song.selected.lyrics key))
          ]
          br
      else
        =span-me [
          upload=(action 'update' song.selected.partInstance song.selected.instance song.selected.index )
          value=(mut (get song.selected.lyrics (concat "" song.selected.index)))
        ]
    else
      h1: =song.selected.selection
      .inline-block
        each partsOrder as |line|
          .displayTable
            with (get song.selected.content (concat "" line.index)) as |part|
              if isStats
                /div.float-right
                /div: h1: =line.name
                .vertical-text: h1: =line.name
              .lyrics-pane
                each-in (get part.lyrics (concat "" line.instance)) as |indx|
                  |{{span-me upload=(action 'update' line.index line.instance indx) value=(mut (get (get (get (get song.selected.content (concat "" line.index)) 'lyrics') (concat '' line.instance)) indx))}}
                  br
        ul.menu-bar.playbar.vertical-align.foreground.float-left
          each-in acts as |act bit|
            li.list-group-item
              button{action act} 
                =bit.emoji
              div: =bit.name

