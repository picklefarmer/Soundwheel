.option-stack
  li
    div
      span Songs
      /if song.names.isFulfilled
        select-me proxy=true selection=song.selected content=song.names
      /else
        select-me


  li
    div
      span Instrument
      if song.instrumentNames.isFulfilled
        select-me proxy=true selection=song.instrument content=song.instrumentNames.filtered
      else
        select-me something
  li
    if song.isOnline
      div class="hit" live

      
  li
    .hidden
      =input type="range" min=".01"  max="6" step=".05" value=song.volume
      =text-me value=(mut song.volume)
    span Master

  if song.isKit
    li
      .hidden
        =input type="range" min=".01"  max="6" step=".05" value=song.kitVolume
        =text-me value=(mut song.kitVolume)
      span Drum-Kit

  li
    .hidden
      =input type="range" min=".01"  max="6" step=".05" value=song.boardVolume
      =text-me value=(mut song.boardVolume)
    span Fretboard



  li
    .hidden
      =input type="range" min=song.minTempVal  max="4000" value=song.bpm
      =text-me value=(mut song.meter)
    span Tempo


  li
    div: =span-me value=(mut song.selected.selection) rows=1 cols=10

    =action-names 

  /li
    div
      switch-option value=model.x
        span PlayType

  /textarea enter="songRead"
    
      
      
