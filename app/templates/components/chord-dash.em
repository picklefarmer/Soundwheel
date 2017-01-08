if chordEdit
  if isEditing
    li
      ul.chord-panel.list-group.panel-body
        each-in acts as |act name|
          li.list-group-item
            button{action act}: =name

      if selected
        ar-peg ableBody=true class=(if verticalTab 'vertical-dash') isEditing="isEditing" higher=this click=null chord=selected as |string fret type|
          button{action "toggleSelected" string fret}: =type
          /&#x2600;
else
  h1: =clock
  if song.chords.isFulfilled
    =scale-vertical class='chord-stack' amount=song.chords.length
      each song.chords as |chord|
        li class="{{if verticalTab 'vertical-dash'}} {{if (arr-comp selection chord) 'match'}}"
          ar-peg chord=chord action="selector"
            =song.main.bankmoji.options
