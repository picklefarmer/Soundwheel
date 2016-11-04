each kitSet as |value type|
  l-measure [
    class="bar-dim"
    measure=song.main.bankmoji.options
    highlight=('bool-me' value)
    click=('action' 'valueUp' type)
  ]
