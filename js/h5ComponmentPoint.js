 /* 基本图文组件对象 */

var H5ComponmentPoint =function ( name, cfg ) {
    var componment = new H5ComponmentBase(name,cfg);
    var base = cfg.data[0][1];

    $.each(cfg.data, function(idx,item){
        var point = $('<div class="point '+idx+'">');
        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="per">'+(item[1]*100)+'%</div>');

        name.append(rate);
        point.append(name);

        var per = (item[1]/base*100)+'%';
        point.width(per).height(per);
        if(item[2]){
            point.css('background-color',item[2]);
        }
        if(item[3]!=undefined && item[4]!=undefined){
            point.css('left',item[3]).css('top',item[4]);
        }
        componment.append(point);
    });

    componment.find('.point').on('click',function(){

        componment.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
    }).eq(0).addClass('point_focus')

    return componment;
}