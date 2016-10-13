.panel-body
  each-in list as | name hex | 
    .panel-body
      .form-control 
        =name
        rgb-pallet [
          class="float right"
          action=(action "updater" name )
          color=hex
          ]
