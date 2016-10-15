li
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
        li
          button{action "newSelection"} New
        li
          button{action "editSelected"} Edit
        li
          button{action "saveSelection"} Save

      if selected
        ar-peg ableBody=true class=(if verticalTab 'vertical-dash') isEditing="isEditing" higher=this click=null chord=selected as |string fret type|
          button{action "toggleSelected" string fret}: =type
          /&#x2600;

else
  if song.chords.isFulfilled
    each song.chords as |chord|
      li class="{{if verticalTab 'vertical-dash'}} {{if (arr-comp selection chord) 'match'}}"
        ar-peg chord=chord action="selector"
          =song.main.bankmoji.options
        /  =clock
