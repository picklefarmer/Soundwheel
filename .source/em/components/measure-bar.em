li
  div
    /select-me selection=view.width value=view.width content=view.range
      
br

if song.selected.isFulfilled
  each song.selected as |color measure|
    l-measure active=("is-classy" measure song.selected.index) index=measure boundValue=song.selected.index
