 /* 饼图组件对象 */

var H5ComponmentPie =function ( name, cfg ) {
    var componment = new H5ComponmentBase(name,cfg);

    //画底图
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('z-index',1);
    var w  = cfg.width;
    var h = cfg.height;

    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    var r = w/2;
    var step = cfg.data.length;

    context.beginPath();
    context.fillStyle = '#eee';
    context.strokeStyle = '#eee';
    context.lineWidth = 1;
    context.arc(r,r,r,0,2*Math.PI);
    context.fill();
    context.stroke();

    //画数据
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('z-index',2);
    canvas.width = context.width = w;
    canvas.height = context.height = h;

    componment.append(canvas);

    var colors = ['#7d2a71', '#3674a2', '#328a96', '#38a89f', '#153840'];
    var sAngel = 1.5*Math.PI;
    var eAngel = 0;
    var aAngel = 2*Math.PI;

    for(var i=0; i<step; i++){
      var item = cfg.data[i];
      var color = item[2] || colors.pop();

      eAngel = sAngel + aAngel * item[1];

      context.beginPath();
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 1;
      

      context.moveTo(r,r);
      context.arc(r,r,r,sAngel,eAngel);
      context.fill();
      context.stroke();

      sAngel = eAngel;

      //  加入所有的项目文本以及百分比

      var text = $('<div class="text">');
      text.text(item[0]);
      var per = $('<div class="per">');
      per.text((item[1]*100)+'%');
      var x = r * Math.sin(.5*Math.PI-sAngel) + r;
      var y = r * Math.cos(.5*Math.PI-sAngel) + r;
      text.css('color',color);
      text.css('opacity',0);

      if(x>r){
        text.css('left',x/2);
      }else{
        text.css('right',(w-x)/2);
      }
      if(y>r){
        text.css('top',y/2);
      }else{
        text.css('bottom',(h-y)/2);
      }
      componment.append(text);
      text.append(per);

    }

    //加入一个蒙板层
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    $(canvas).css('z-index',3);
    canvas.width = context.width = w;
    canvas.height = context.height = h;
    componment.append(canvas);

    context.fillStyle = '#eee';
    context.strokeStyle = '#eee';
    context.lineWidth = 1;
    
    function draw( per ){
      context.clearRect(0,0,w,h);
      context.beginPath();
      context.moveTo(r,r);
      if(per<=0){
        context.arc(r,r,r,0,2*Math.PI);
        componment.find('.text').css('opacity',0);
      }else{
        context.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
      }
      
      context.fill();
      context.stroke();

      if(per>=1){
        componment.find('.text').css('transition','all 0s');
        H5ComponmentPie.reSort( componment.find('.text') );
        componment.find('.text').css('transition','all 1s');
        componment.find('.text').css('opacity',1);
        context.clearRect(0,0,w,h);
      }

    }
    draw(0);

    //  重排项目文本元素
H5ComponmentPie.reSort = function( list ){

  //  1. 检测相交
  var compare = function( domA, domB ){

    //  元素的位置，不用 left，因为有时候 left为 auto
    var offsetA = $(domA).offset();
    var offsetB = $(domB).offset();

    //  domA 的投影
    var shadowA_x = [ offsetA.left,$(domA).width()  + offsetA.left ];
    var shadowA_y = [ offsetA.top ,$(domA).height() + offsetA.top ];

    //  domB 的投影
    var shadowB_x = [ offsetB.left,$(domB).width()  + offsetB.left ];
    var shadowB_y = [ offsetB.top ,$(domB).height() + offsetB.top  ];

    //  检测 x
    var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

    //  检测 y 轴投影是否相交
    var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
    return intersect_x && intersect_y;
  }


  //  2. 错开重排
  var reset = function( domA, domB ){

    if( $(domA).css('top') != 'auto' ){

      $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height() );
    }
    if( $(domA).css('bottom') != 'auto' ){

      $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height() );
    }

  }

  //  定义将要重排的元素
  var willReset = [list[0]];

  $.each(list,function(i,domTarget){
    if( compare(willReset[willReset.length-1] , domTarget ) ){
      willReset.push(domTarget);  //  不会把自身加入到对比
    }
  });

  if(willReset.length >1 ){
      $.each(willReset,function(i,domA){
          if( willReset[i+1] ){
            reset(domA,willReset[i+1]);
          }
      });
      H5ComponMentPie.reSort( willReset );
  }

}



    componment.on('onLoad',function(){
      var s = 0;
      for(var i=0; i<100; i++){
        setTimeout(function(){
          s+=.01;
          draw(s);
        },i*10+500);
      }
    })
    componment.on('onLeave',function(){
      var s = 1;
      for(var i=0; i<100; i++){
        setTimeout(function(){
          s-=.01;
          draw(s);
        },i*10);
      }
    })

    return componment;
}










