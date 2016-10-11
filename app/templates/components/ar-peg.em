if ableBody
  chord-body difference=difference appendToSelectedCol="appendToSelectedCol" action="appendToSelected" low=low high=high chord=chord as |fret notes|
    each difference as |frets index|
      a-note index=index low=low fret=fret as |note type|
        yield notes note type

else
  each chord as |fret notes|
    tr
      each difference as |frets index|
        =a-note index=index low=low fret=fret as |note|
          yield notes note
