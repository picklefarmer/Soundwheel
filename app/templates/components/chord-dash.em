
li
  div: =song.chordEditFlag
if chordEdit
  if isEditing
    li
      ul
        li
          button{action "updateSelection"} Update
        li
          button{action "deleteSelection"} Remove
        li
          button{action "chordCapture"} Capture
      if selected
        ar-peg isEditing="isEditing" higher=this click=null chord=selected as |string fret|
          button{action "toggleSelected" string fret}  |}{|

else
  li
    button{action "newSelection"} New
  li
    button{action "editSelected"} Edit
  li
    button{action "saveSelection"} Save
  if song.chords.isFulfilled
    each song.chords as |chord|
      li class="{{if (arr-comp selection chord) match}}"
        ar-peg chord=chord action="selector"
