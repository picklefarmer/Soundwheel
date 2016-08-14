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
li
  span are we live?
  div: =song.isOnline
    
li
  div
    =input type="range" min=".01"  max="6" step=".1" value=options.song.volume
    =text-me value=(mut options.song.volume)
    span Volume

li
  div
    =input type="range" min="2264"  max="4000" value=song.bpm
    =text-me value=(mut song.meter)
    span Tempo

li
  div: =span-me value=(mut song.selected.selection) rows=1 cols=10

each options.actionNames as |com|
  with com.name as |name|
    li
      div class="{{if com.class com.class 'blank'}}"
        component com.type name=name id=name ctrl=this click=actionHandler
        label-for for=name
      if com.class
        span.navlabel: =name
/li
  div
    switch-option value=model.x
      span PlayType

/textarea enter="songRead"
  
    
    
