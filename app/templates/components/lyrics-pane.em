.row
  .column.large-12.large-centered
    .form-group
      =span-me [
        class="field"
        value=(mut song.selected.measure.lyric)
        rows=1
        cols=26
        ]
/textarea class="field" value=song.measure.lyric
/textarea class="field" value=song.measure.debug
