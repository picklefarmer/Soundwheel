if isEdit
  div: =span-me [
    dynamicWidth=true
    didInsertElement=toFocus
    value=(mut song.selected.part.name)
    class="bar-input"
    aether=(action 'isEdit' song.selected.partInstance target=song bubbles=false)
  ]
else
  div: =partName
