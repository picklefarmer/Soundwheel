.panel-body
  each-in list as | name hex | 
    .panel-body
      =name 
      rgb-pallet [
        class="float right"
        action=(action "updater" name )
        color=hex
        ]
