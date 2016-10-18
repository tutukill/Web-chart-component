 /* 垂直组件对象 */

var H5ComponmentBar_v =function ( name, cfg ) {
    var componment = new H5ComponmentBar(name,cfg);

    var width = ( 100 / cfg.data.length ) >> 0 ;
    componment.find('.line').width( width + '%'); 

    $.each( componment.find('.rate') ,function(){
      var w = $(this).css('width');
      $(this).height(w).width('');

    });

    $.each( componment.find('.per'),function(){
      $(this).appendTo( $(this).prev() ) ;
    })

    return componment;
}