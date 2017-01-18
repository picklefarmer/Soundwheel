each-in buttons as |name desc|
  if (e-q name "outlet")
    yield
  else
    component [
      (concat desc.type "-property")
      desc=desc.name
      name=name
      song=song
      toggle=(get song name)
      mouseEnter=(action 'overLabel' name target=song)
      mouseLeave=(action 'outLabel' target=song)
      action=(action name target=song)
    ]
    
