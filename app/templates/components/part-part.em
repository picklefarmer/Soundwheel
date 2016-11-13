if isEdit
  div: =span-me [
    didInsertElement=toFocus
    value=(mut song.selected.part.name)
    class="bar-input"
    aether=(action 'isEdit' target=song bubbles=false)
  ]
else
  div: =measure
