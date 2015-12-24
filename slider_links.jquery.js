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
		links_elem:		'',					// '.slider-links',	// links holder
		links_item:		'',					// 'li',				// link item
		numbers:		false,				// auto number on link 
		prevButton:		'',					// '#slider .prev',
		nextButton:		'',					// '#slider .next',		
		title_elem:		'',					// '#slider-txt h3',	// text bar title
		desc_elem:		'',					// '#slider-txt span', // text bar description
		autoscroll:		0,					// 0 - off, other milisecond (sec * 1000)
		pause:			false,				// internal variable: pause
		small_width:	false,				// i.e. 400 responsive images, load small at width
		fx_r:			[]
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
			prevButton:		settings.prevButton,
			nextButton:		settings.nextButton,
			title_elem:		settings.title_elem,
			desc_elem:		settings.desc_elem,
			autoscroll:		settings.autoscroll,
			numbers:		settings.numbers,
			small_width:	settings.small_width,
			fx_r:			settings.fx_r,			// fx array
			fx_c:			-1						// fx counter
		});
		
		function setAutoScroll() {
			myTimer = setInterval(function() {slidenext();}, set.autoscroll);
		}
		
		function slidenext(){
			if (slideAct) return false;
			
			slideAct = true;
			if (set.pause){
				slideAct = false;
				return false;
			}
			
			var current = $(set.elem+' '+set.item+'.show');
			if (set.fx_r.length) current.removeClass(set.fx_r[set.fx_c]);

			var next = (current.next(set.item).length ? current.next(set.item) : $(set.elem+'  '+set.item+':first'));			
			slidenextshow(next);
			slideAct = false;
		}

		function slideprev(){
			if (slideAct) return false;
			
			slideAct = true;
			if (set.pause){
				slideAct = false;
				return false;
			}
			var current = $(set.elem+' '+set.item+'.show');
			var next = (current.prev(set.item).length ? current.prev(set.item) : $(set.elem+' '+set.item+':last'));
			slidenextshow(next);
			slideAct = false;
		}

		function slidenextshow(next) {
			if (!next.attr('src')) {
				if (set.small_width && $(window).width()<=set.small_width){
					next.attr('src', next.data("src-small"));
				} else {
					next.attr('src', next.data("src"));
				}				
			}
			if (set.links_elem) $(set.links_elem +' '+ set.links_item+" a").removeClass('active');
			$(set.elem+' '+set.item).css('display', 'none').removeClass('show');
			
			next.fadeIn('slow').addClass('show');
			
			if (set.title_elem){				
				if (next.attr('longdesc')) {
					$(set.title_elem).html('<a href="' + next.attr('longdesc') + '">' + next.attr('alt') + '</a>');
				} else {
					$(set.title_elem).html(next.attr('alt'));
				}
			}
			if (set.desc_elem){
				$(set.desc_elem).html(next.attr('title'));				
				if (next.attr('alt') != '') $(set.desc_elem).show();
				else $(set.desc_elem).hide();
			}
			
			if (set.links_elem)
			$(set.links_elem +' '+ set.links_item+" a:eq(" + next.index() + ")").addClass('active');
			
			if (set.fx_r.length){
				set.fx_c++
				if (set.fx_c > set.fx_r.length) set.fx_c=0;
				next.addClass(set.fx_r[set.fx_c]);
			}
		}
		
		// Initialise
		$(function(){
			$(set.elem+' '+set.item).css('display', 'none');
			var first = $(set.elem+'  '+set.item+':first');

			slidenextshow(first);
			
			if (set.links_item){
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
			}
			
			if (set.prevButton)
			$(set.prevButton).click(function(){
				set.pause=false;
				slidenext();
			});
			if (set.nextButton)
			$(set.nextButton).click(function(){
				set.pause=false;
				slideprev();
			});
			
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
