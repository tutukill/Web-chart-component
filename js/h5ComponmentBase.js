
var H5ComponmentBase = function( name,cfg ){
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('.','_');
	var cls = ' h5_componment_'+cfg.type;
	var componment = $('<div class="h5_componment '+ cls +' h5_componment_name_' + name + '" id="'+ id +'">');
	cfg.text && componment.text(cfg.text);
	cfg.width && componment.width(cfg.width/2);
	cfg.height && componment.height(cfg.height/2);
	cfg.css && componment.css(cfg.css);
	cfg.css && componment.css('backgroundImage','url('+cfg.bg+')')
	if(cfg.center===true){
		componment.css({
			marginLeft:(cfg.width/4*-1)+"px",
			left:'50%'
		})
	}

	componment.on('onLoad',function(){
		$(this).addClass( cls + '_onload').removeClass( cls+ '_onleave');
		cfg.animateIn && componment.animate(cfg.animateIn);
		return false;
	});
	componment.on('onLeave',function(){
		$(this).addClass( cls + '_onleave').removeClass( cls+ '_onload');
		cfg.animateOut && componment.animate(cfg.animateOut);
		return false;
	})

	return componment;
}


