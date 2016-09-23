import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'canvas',
  didInsertElement(){
    let content = this.get('element'),
        ctx     = content.getContext('2d'),
        style   = content.style;

    content.width = 300
    content.height = 300
    
    style.margin = "0 auto";
    style.display = "block";
    style.border  = "1px solid black"
    let trebleArr = [
    [[2,12],[9,19],[8,23]],
    [[7,26],[18,23],[16,16]],
    [[-11,-50],[-6,-63],[-2,-66]],
    [[2,-68],[5,-59],[4,-47]],
    [[0,-33],[-15,-25],[-16,-12]],
    [[-17,0],[-6,7],[3,7]],
    [[12,7],[17,0],[18,-8]],
    [[18,-17],[13,-22],[4,-22]],
    [[-5,-22],[-11,-15],[-7,-6]],
    [[-8,-14],[-3,-19],[6,-19]],
    [[14,-19],[20,-13],[20,-4]],
    [[18,5],[13,10],[4,10]],
    [[-5,10],[-15,4],[-13,-9]],
    [[-12,-22],[2,-30],[5,-44]],
    [[7,-56],[0,-66],[-2,-61]],
    [[-5,-56],[-6,-47],[0,-33]],
    [[18,21],[14,28],[7,28]],
    [[-1,28],[-2,22],[-2,20]]
    ];

    let length = trebleArr.length;

    ctx.beginPath()
    let k = 100;
    ctx.moveTo(k+-1,k+20)
    for(var i = 0; i < length; i++){
      let [a,b,c] = trebleArr[i];
      ctx.bezierCurveTo(k+a[0],k+a[1],
                        k+b[0],k+b[1],
                        k+c[0],k+c[1])
    }

    ctx.stroke()
    ctx.fill()
  }
});
