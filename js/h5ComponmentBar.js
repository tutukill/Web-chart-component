 /* 基本图文组件对象 */

var H5ComponmentBar =function ( name, cfg ) {
    var componment = new H5ComponmentBase(name,cfg);

    $.each(cfg.data, function(idx, item){
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var line = $('<div class="line">');
        var per = $('<div class="per">');

        var width = (item[1]*100)+'%';
        rate.css('width',width);
        rate.html('<div class="bg">');
        name.text(item[0]);
        per.text(width);

        line.append(name).append(rate).append(per);

        componment.append(line);
    })

    return componment;
}