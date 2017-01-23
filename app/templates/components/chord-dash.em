if chordEdit
  if isEditing
    
      /ul.menu-bar.playbar.vertical-align.foreground.float-left
        /chord-panel.list-group.panel-body
        each-in acts as |act bit|
          li.list-group-item
            button{action act} 
              =bit.emoji
              div: =bit.name

      if selected
        .horizontal-align
          ar-peg ableBody=true verticalTab=verticalTab isEditing=true higher=this click=null chord=selected as |string fret type|
            button{action "toggleSelected" string fret}: h1: =type
            /&#x2600;
else
  h1: =clock
  if song.chords.isFulfilled
    =scale-vertical class='chord-stack' amount=song.chords.content.length
      each song.chords as |chord|
        div: li class="{{if verticalTab 'vertical-dash'}} {{if (arr-comp selection chord) 'match'}}"
          ar-peg chord=chord action="selector"
            =song.main.bankmoji.options
