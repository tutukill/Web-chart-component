 /* 折线组件对象 */

var H5ComponmentPolyline =function ( name, cfg ) {
    var componment = new H5ComponmentBase(name,cfg);

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var w  = cfg.width;
    var h = cfg.height;

    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    var step = 10;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#aaaaaa';

    for(var i=0; i<step+1; i++){
      var y = (h/step)*i;
      context.moveTo(0,y);
      context.lineTo(w,y);
    }

    step = cfg.data.length+1;
    for(var i=0; i<step+1; i++){
      var x = (w/step)*i;
      context.moveTo(x,0);
      context.lineTo(x,h)
    }
    context.stroke();


    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#ff8878';

    var x,y;
    var row = w/(cfg.data.length+1)

    step  = cfg.data.length+1;
  
    var text_w = w/step >> 0;
    for(var i=0; i<cfg.data.length; i++){
      var x = (w/step)*i;
      context.moveTo(x,0);
      context.lineTo(x,h);
      if(cfg.data[i]){
        var polyName = $('<div class="text">');
        polyName.text(cfg.data[i][0]);
        polyName.css('width',text_w/2)
          .css('left',(x/2 - text_w/4) + text_w/2 );
        componment.append(polyName);
      }
      
    }

    function draw( per){

      context.clearRect(0,0,w,h);
      //画点
      context.beginPath();
      context.strokeStyle = 'rgba(255, 136, 120, 1)';
      for(i in cfg.data){
        var item = cfg.data[i]; 
        x = row*i+row;
        y = (1-(item[1]* per)) * h;
        context.moveTo(x,y);
        context.arc(x,y,5,0,2*Math.PI);

      }

      //划线
      
      context.lineWidth = 3;
      context.moveTo(row, h * (1-(cfg.data[0][1]* per)) );
      for(i in cfg.data){
        var item = cfg.data[i]; 
        x = row * i+row;
        y = (1-(item[1])*per) * h;
        context.lineTo(x, y);
      }
      context.stroke();

      //绘阴影
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(255, 136, 120, 0)';

      context.lineTo(x,h);
      context.lineTo(row,h);

      context.fillStyle = 'rgba(255, 136, 120, 0.2)';
      context.fill();

      //加百分比
      for(i in cfg.data){
        var item = cfg.data[i]; 
        x = row * i + row -10;
        y = (1-(item[1])*per)*h -15;
        context.fillStyle = item[2] ? item[2] : '#595959';
        context.fillText(((item[1]*100) >>0) +'%', x, y);
      }

      context.stroke();

    }

    componment.on('onLoad',function(){
      var s = 0;
      for(var i=0; i<100; i++){
        setTimeout(function(){
          s+=0.01;
          draw(s);
        },i*10);
      }
    })
    componment.on('onLeave',function(){
      var s = 1;
      for(var i=0; i<100; i++){
        setTimeout(function(){
          s-=0.01;
          draw(s);
        },i*10);
      }
    })


    return componment;
}










