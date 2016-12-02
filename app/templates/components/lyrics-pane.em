if song.selected.isFulfilled
  .row
    .column.large-12.large-centered
      .form-group
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
          .form-control.field
            h1: =song.selected.selection
            each partsOrder as |line|
              with (get song.selected.content (concat "" line.index)) as |part|
                each-in (get part.lyrics (concat "" line.instance)) as |indx|
                  |{{span-me upload=(action 'update' line.index line.instance indx) value=(mut (get (get (get (get song.selected.content (concat "" line.index)) 'lyrics') (concat '' line.instance)) indx))}}
                  br
