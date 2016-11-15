if isEdit
  div: =span-me [
    size="5"
    didInsertElement=toFocus
    value=(mut song.selected.part.name)
    class="bar-input"
    aether=(action 'isEdit' target=song bubbles=false)
  ]
else
  div: =partName
