
if isObj
  each-in content as |prop val|
    option selected={'is-classy' prop selection} value=prop: =val
else
  each content as |val|
    if proxy
      option-me selected=('is-classy' val (get selection 'selection')) value=val: =val
    else
      option-me selected=('is-classy' val selection) value=val: =val
  
