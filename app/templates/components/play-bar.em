each-in buttons as |name desc|
  component [
    (concat desc.type "-property")
    desc=desc.name
    name=name
    song=song
    toggle=(get song name)
    action=(action name target=song)
  ]
