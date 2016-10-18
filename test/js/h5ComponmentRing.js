 /* 环形组件对象 */

var H5ComponmentRing =function ( name, cfg ) {
  cfg.type = 'pie';
  if(cfg.data.length>1){  //  环图应该只有一个数据
    cfg.data = [cfg.data[0]];
  }
  var componment =  new H5ComponmentPie( name ,cfg );

  var mask = $('<div class="mask">');
  componment.addClass('h5_componment_ring');

  componment.append(mask);

  var text = componment.find('.text');

  text.attr('style','');
  if(cfg.data[0][2]){
    text.css('color',cfg.data[0][2]);
  }
  mask.append( text );

  return componment;
}










