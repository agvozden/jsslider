/**
 * slider with links 
 * @author agvozden
 * www.gvozden.info
 * @param {} $ 
 */
(function($) {
$.fn.slider_links = function(options) {
	
	var settings=jQuery.extend({
		elem:			'#slider',			// main element, items holder
		item: 			'img',				// items, usually img or div
		links_elem:		'.slider-links',	// links holder
		links_item:		'li',				// link item
		numbers:		false,				// auto number on link 
		title_elem:		'#slider-txt h3',	// text bar title
		desc_elem:		'#slider-txt span', // text bar description
		autoscroll:		0,					// 0 - off, other milisecond (sec * 1000)
		pause:			false				// internal variable: pause
	}, options);
		
	this.each(function(i, one) {

		// Setting variables...
		var $this = $(one);	// This box - component
		var slideAct = false;
		var slidePause = false;
		
		var set=jQuery.extend({
			// Inherit settings value from default
			elem:			settings.elem,
			item: 			settings.item,
			links_elem:		settings.links_elem,
			links_item:		settings.links_item,
			title_elem:		settings.title_elem,
			desc_elem:		settings.desc_elem,
			autoscroll:		settings.autoscroll,
			numbers:		settings.numbers	
		});
		
		function setAutoScroll() {
			myTimer = setInterval(function() {slidenext();}, set.autoscroll);
		}
		
		function slidenext(){
			if (slideAct) return false;
			
			slideAct = true;

			if (set.pause) return false;
			var current = $(set.elem+' '+set.item+'.show');
			var next = (current.next(set.item).length ? current.next(set.item) : $(set.elem+'  '+set.item+':first'));
			slidenextshow(next);

		}

		function slidenextshow(next) {
			if (!next.attr('src')) {
				next.attr('src', next.data("src"));
			}
			$(set.links_elem +' '+ set.links_item+" a").removeClass('active');
			$(set.elem+' '+set.item).css('display', 'none').removeClass('show');
			next.fadeIn('slow').addClass('show');
			if (next.attr('longdesc')) {
				$(set.title_elem).html('<a href="' + next.attr('longdesc') + '">' + next.attr('alt') + '</a>');
			} else {
				$(set.title_elem).html(next.attr('alt'));
			}
			$(set.desc_elem).html(next.attr('title'));
			if (next.attr('alt') != '') $(set.desc_elem).show();
			else $(set.desc_elem).hide();
			
			$(set.links_elem +' '+ set.links_item+" a:eq(" + next.index() + ")").addClass('active');
		}
		
		// Initialise
		$(function(){
			$(set.elem+' '+set.item).css('display', 'none');
			var first = $(set.elem+'  '+set.item+':first');
			first.attr('src', first.data("src"));
			first.css('display', 'inline').addClass('show');
			if (first.attr('longdesc')) {
				$(set.title_elem).html('<a href="' + first.attr('longdesc') + '">' + first.attr('alt') + '</a>');
			} else {
				$(set.title_elem).html(first.attr('alt'));
			}
			$(set.desc_elem).html(first.attr('title'));
			
			var i = '';
			if (set.numbers) i = 0;		
			$(set.elem+' '+set.item).each(function () {
				if (set.numbers) i++;
				$(set.links_elem).append('<'+set.links_item+'><a>' + i + '</a></'+set.links_item+'>')
			});	
			
			var links_item_path = set.links_elem +' '+ set.links_item; 
			$(links_item_path + " a:eq(0)").addClass('active');
			$(links_item_path + " a").click(function () {
				var i = $(links_item_path + " a").index(this);
				var next = $(set.elem+' '+set.item+':eq(' + i + ')');
				slidenextshow(next);
			})
			$(set.elem)
			.mouseover(function(){set.pause=true;})
			.mouseout(function(){set.pause=false;})

			// set autoscroll
			if (set.autoscroll){
				setAutoScroll();
			}				
			
		});
		
	});

	return this;
}
})(jQuery);
