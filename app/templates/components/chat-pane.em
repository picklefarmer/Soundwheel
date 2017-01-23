=tool-tip name=song.barOverlay
  =song.barOverlay
ul.panel.panel-default
  if song.leaders.isFulfilled
    each song.dataArray as |messObject|
      .panel-heading
        img.badge.icon src="{{get song.leaders messObject.uid}}"
        h3.chatLeft: =messObject.displayName
        .chatLeft.numeric{action 'goToIndex' messObject.varm}: span {{roman-me messObject.varm}}
        h3.messageChat: =messObject.message
      .panel-body
=span-me[
  value=myValue
  upload=(action 'messageIn' (action 'clear') target=song)
]

