 //var jdata = [];
 var H5 = function(){
 	this.id = ('h5_'+Math.random()).replace('.','_');
 	this.el = $('<div class="h5" id="'+this.id+'">').hide();
 	this.page = [];
 	$('body').append(this.el);

 	this.addPage = function(name, text){
        //jdata.push({isPage:true, name:name, text:text})
 		var page = $('<div class="h5_page section">');
 		if(name!= undefined){
 			page.addClass('h5_page_'+name);
 		}
 		if(text!=undefined){
 			page.text(text);
 		}
 		this.el.append(page);
 		this.page.push(page);
 		if( typeof this.whenAddPage === 'function' ){
            this.whenAddPage();
        }
        return this;
 	}

 	this.addComponment = function(name, cfg){
        //jdata.push({isPage:false, name:name, cfg:cfg})
 		var cfg = cfg || {};
 		cfg = $.extend({
 			type: 'base'
 		},cfg);

 		var componment;
 		var page = this.page.slice(-1)[0];
 		switch(cfg.type) {
 			case 'base' :
 				componment = new H5ComponmentBase(name, cfg);
			    break;
            case 'polyline' :
                componment = new H5ComponmentPolyline(name,cfg);
                break;
            case 'pie' :
                componment = new H5ComponmentPie(name,cfg);
                break;
            case 'bar' :
                componment = new H5ComponmentBar(name,cfg);
                break;
            case 'bar_v' :
                componment = new H5ComponmentBar_v(name,cfg);
                break;
            case 'radar' :
                componment = new H5ComponmentRadar(name,cfg);
                break;
            case 'pie' :
                componment = new H5ComponmentPie(name,cfg);
                break;
            case 'ring' :
                componment = new H5ComponmentRing(name,cfg);
                break;
            case 'point' :
                componment = new H5ComponmentPoint(name,cfg);
                break;
			default:
 		}
 		page.append(componment);
 		return this;
 	}

 	this.loader = function( firstPage ){
 		this.el.fullpage({
 			onLeave:function(index, nextIndex, direction){
 				$(this).find('.h5_componment').trigger('onLeave');
 			},
 			afterLoad:function( anchorLink, index ) {
 				$(this).find('.h5_componment').trigger('onLoad');
 			}
 		});
        this.page[0].find('.h5_component').trigger('onLoad');
 		this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
 	}

 	return this;
 }