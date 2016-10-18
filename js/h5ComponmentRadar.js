 /* 折线组件对象 */

var H5ComponmentRadar =function ( name, cfg ) {
    var componment = new H5ComponmentBase(name,cfg);

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var w  = cfg.width;
    var h = cfg.height;

    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    var r = w/2;
    var step = cfg.data.length;

    //绘制背景
    var isBlue = false;
    for( var s = 10;s >0 ;s--){

      context.beginPath();
      for(var i=0; i<step; i++){
        
        var rad = (2 * Math.PI / 360) * ( 360 / step)*i;
        var x = r + Math.sin( rad ) * r * (s/10);
        var y = r + Math.cos( rad ) * r * (s/10);

        context.lineTo(x,y);
        
      }
      context.closePath();
      context.fillStyle = (isBlue =! isBlue) ? '#99c0ff' : '#f1f9ff';
      context.fill();
    }

    //绘制伞骨
    for(var i=0; i<step; i++){
      context.beginPath();
      var rad = (2 * Math.PI / 360) * ( 360 / step)*i;
      var x = r + Math.sin( rad ) * r;
      var y = r + Math.cos( rad ) * r;
      context.moveTo(r,r);
      context.lineTo(x,y);

        //  输出项目文字
      var text = $('<div class="text">');
      text.text( cfg.data[i][0] );
      text.css('transition','all .5s '+ i*.1 + 's');

      if( x > w/2 ){
       text.css('left',x/2+5);
      }else{
       text.css('right',(w-x)/2+5);
      }

      if( y > h/2){
        text.css('top',y/2+5);
      }else{
        text.css('bottom',(h-y)/2+5);
      }
      if( cfg.data[i][2] ){
        text.css('color',cfg.data[i][2])
      }

      componment.append(text);
       
    }
    context.strokeStyle = '#e0e0e0';
    context.stroke();   
    
    //数据层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var w  = cfg.width;
    var h = cfg.height;

    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    context.strokeStyle = '#f00';
    function draw( per ){

      if(per <= 1){
          componment.find('.text').css('opacity',0);
      }
      if(per >= 1){
          componment.find('.text').css('opacity',1);
      }
      if(per<1)
      context.clearRect(0,0,w,h);
      //  输出数据的折线
      for(var i=0;i<step;i++){
        var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
        
        var rate  = cfg.data[i][1] * per;

        var x = r + Math.sin( rad ) * r * rate;
        var y = r + Math.cos( rad ) * r * rate ;

        context.lineTo(x,y);
     
      }
      context.closePath();
      context.stroke();

      context.fillStyle = '#ff7676';
      for(var i = 0; i < step; i++){
        var rad = (2 * Math.PI / 360) * ( 360 / step)*i;
        var rate = cfg.data[i][1] * per;
        var x = r + Math.sin( rad ) * r * rate;
        var y = r + Math.cos( rad ) * r * rate;
        context.beginPath();
        context.arc(x,y,5,0,2*Math.PI);
        context.fill();
        context.closePath();
      }
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










