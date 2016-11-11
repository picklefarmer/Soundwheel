if song.selected.isFulfilled
  .row
    .column.large-12.large-centered
      .form-group
        unless full
          if song.isPart
            each-in song.selected.lyrics as |key|
              =span-me value=(mut (get song.selected.lyrics key))
              br
          else
            =span-me value=(mut (get song.selected.lyrics (concat "" song.selected.index)))
        else
          .form-control.field
            h1: =song.selected.selection
            each song.selected.partOrder as |line|
              with (get song.selected.parts (concat "" line.index)) as |part|
                each-in (get part.lyrics (concat "" line.instance)) as |indx|
                  |{{span-me value=(mut (get (get (get (get song.selected.parts (concat "" line.index)) 'lyrics') (concat '' line.instance)) indx))}}
                  br
