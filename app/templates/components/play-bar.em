each-in buttons as |name desc|
  component [
    (concat desc.type "-property")
    desc=desc.name
    name=name
    song=song
    action=(action name target=song)
  ]
