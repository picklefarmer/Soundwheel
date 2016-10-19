if isObj
  each-in content as |prop val|
    option value=prop: =val
else
  each content as |val|
    option-me val=val: =val
  
