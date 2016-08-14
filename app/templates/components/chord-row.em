if ("chord-len" strings)
  each rows as |strings fret|
    chord-btn action="toggleSelected" string=string fret=("btn-row" fret low 'chord-row')


