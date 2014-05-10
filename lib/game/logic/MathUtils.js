function CalcMapDistance(x1, y1, x2, y2, w, h){
    
  var points = [{x: x1 / w,
                y:  y1 / h}
                ,{x: x2 / w,
                y: y2 / h}];
                
  var xs = 0;
  var ys = 0;
  xs = points[1].x - points[0].x;
  xs = xs * xs;
  ys = points[1].y - points[0].y;
  ys = ys * ys;
  var dist = Math.sqrt( xs + ys );
  return dist;
                    
    
}