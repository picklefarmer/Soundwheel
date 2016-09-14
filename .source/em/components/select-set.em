.panel-body
  each list as |value index|
    .panel-body
      = value.name
      rgb-pallet class="float right" action="updater" name=value.name color=value.hex
