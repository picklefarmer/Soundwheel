/toggle-button bool=options.verticalTab
  |Flip
div
  if song.main.isFulfilled
    each-in names as |name type|
      component[
        type
        name=name
        size=size
      ]
      
if isTutorial
  tutorial-pane
