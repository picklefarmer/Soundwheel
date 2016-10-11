each-in buttons as |name desc|
  toggle-button action=('action' name)
    desc

/button{action "sustain"} href="sustain" &infin;
/button{action "stepLeft"} href="" &#9664;
/button{action "play"} href="" &#9199;
/button{action "stepRight"} href="" &#9654;
/button{action "loop"} href="": =loopBtn

/.playGroup
  .btn-group.btn-group-justified
    span.btn.btn-default{action "sustain"}
      .sustainbtn
    span.btn.btn-default{action "loop"}
      .loopbtn
    span.btn.btn-default{action "stepLeft"}
      .arrowbtn.arrow-left
    span.btn.btn-default{action "play"}
      .arrowbtn.arrow-play
    span.btn.btn-default{action "stepRight"}
      .arrowbtn.arrow-right
