.row
  .column.large-12.large-centered
    .form-group
      unless full
        =span-me [
          class="field"
          value=(mut song.selected.measure.lyric)
          rows=1
          cols=26
          ]
      else
        h1: =song.selected.selection
        each song.selected as |line lineNmbr|
          div: =get line "lyric"       
