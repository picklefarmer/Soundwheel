li
  div
    if song.names.isFulfilled
      select-me selection=song.selected content=song.names
    else
      select-me


li
  div
    if song.instrumentNames.isFulfilled
      select-me selection=song.instrument content=song.instrumentNames.filtered
    else
      select-me something

/li
  div
    input type="range" min=".01"  max="6" step=".1" value=options.song.volume
    input type="text"  value=options.song.volume
    span Volume

/li
  div
    input type="range" min="264"  max="2000" value=options.song.bpm
    input type="text"  value=options.song.meter
    span Tempo

/li
  textarea value=song.selected.selection

/each options.actionNames as |com|
  with com.name as |name|
    li
      |<div class="{{if com.class com.class 'blank'}}">
      component com.type name=name id=name ctrl=this click=actionHandler
        label-for for=name
      |</div>
      if com.class
        span.navlabel: =name

/li
  div
    switch-option value=model.x
      span PlayType

/textarea enter="songRead"
  
    
    
