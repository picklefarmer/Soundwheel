.row
  .column.large-12.large-centered
    .form-group
      unless full
        =span-me value=(mut song.selected.measure.lyric)
      else
        .form-control.field
          h1: =song.selected.selection
          each song.selected as |line lineNmbr|
            div: =get line "lyric"       
