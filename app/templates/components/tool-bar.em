yield
// from source
each group as |panel|
  if (e-q panel.options 'middle')
    =hover-label [
      class=(concat panel.options 'Full')
      autohide=panel.enabled 
      vertcalTab=song.options.verticalTab
      mouseEnter=(action 'overLabel' panel.name target=song)
      mouseLeave=(action 'outLabel' target=song)
      ]
      component panel.name
  else
    =hover-label [
      class=(concat panel.options 'Full')
      autohide=panel.enabled
      bound=song.barNow
      mouseEnter=(action 'overLabel' panel.name target=song)
      mouseLeave=(action 'outLabel' target=song)
      ]
      component panel.name
