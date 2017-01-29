each graphics as |graphic|
  =toggle-property [
    class=graphic.class
    tagName="span"
    name=graphic.name
    desc=graphic.label
    song=song
    mouseEnter=(action 'overLabel' graphic.name graphic.label target=song)
    mouseLeave=(action 'outLabel' target=song)
  ]
