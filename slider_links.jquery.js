/*
var slider_pause = false;
var slider_elem = '.img-gallery ul';
var slider_item = 'li';
var slider_links = '.controls';
var slider_links_item = 'span';
var slider_desc = '';
var slider_auto = 0;
var slider_numbers = false;
*/

// UNDER CONSTRUCTION !!!!!

/**
 * slider with links 
 * @param {} $ 
 */
(function($) {
$.fn.slider_links = function(options) {
	
	var settings=jQuery.extend({
		elem:			'.img-gallery ul';
		item: 			'li';
		links_elem:		'.controls',
		links_item:		'span',
		desc_elem:		'',				
		autoscroll:		0,
		numbers:		false
	}, options);
	
	//var slider_link_item = slider_links + " " + slider_links_item;
	
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

			if (slider_pause) return false;
			var current = $(slider_elem+' '+slider_item+'.show');
			var next = (current.next(slider_item).length ? current.next(slider_item) : $(slider_elem+'  '+slider_item+':first'));
			slidenextshow(next);

		}

		function slidenextshow(next) {
			if (!next.attr('src')) {
				next.attr('src', next.attr('data-src'));
			}
			$(slider_link_item+" a").removeClass('active');
			$(slider_elem+' '+slider_item).css('display', 'none').removeClass('show');
			next.fadeIn('slow').addClass('show');
			if (next.attr('longdesc')) {
				var title = '<h3><a href="' + next.attr('longdesc') + '">' + next.attr('alt') + '</a></h3>';
				var description = next.attr('title');
			} else {
				var title = '<h3>' + next.attr('alt') + '</h3>';
				var description = next.attr('title');
			}
			$(slider_desc).html(title + description);
			if (next.attr('alt') != '') $(slider_desc).show();
			else $(slider_desc).hide();
			$(slider_link_item+" a:eq(" + next.index() + ")").addClass('active');
		}
		
		// Initialise
		$(function(){

			$(slider_elem+' '+slider_item).css('display', 'none');
			var first = $(slider_elem+'  '+slider_item+':first');
			first.attr('src', first.attr('data-src'));
			first.css('display', 'inline').addClass('show');
			if (first.attr('longdesc')) {
				var title = '<h3><a href="' + first.attr('longdesc') + '">' + first.attr('alt') + '</a></h3>';
				var description = first.attr('title');
			} else {
				var title = '<h3>' + first.attr('alt') + '</h3>';
				var description = first.attr('title');
			}
			$(slider_desc).html(title + description);
			var i = '';
			if (slider_numbers) i = 0;
		
			$(slider_elem+' '+slider_item).each(function () {
				if (slider_numbers) i++;
				$(slider_links).append('<'+slider_links_item+'><a>' + i + '</a></'+slider_links_item+'>')
			});
			$(slider_link_item + " a:eq(0)").addClass('active');
			if (slider_auto) setInterval('slidenext()', slider_auto);
			if ($(slider_desc+" h3").html() == '') $(slider_desc).hide();
			$(slider_link_item + " a").click(function () {
				var i = $(slider_link_item + " a").index(this);
				var next = $(slider_elem+' '+slider_item+':eq(' + i + ')');
				slidenextshow(next);
			})
			$(slider_elem)
			.mouseover(function(){slider_pause=true;})
			.mouseout(function(){slider_pause=false;})

			// set autoscroll
			if (set.autoscroll){
				setAutoScroll();
			}				
			
		});
		
	});

	return this;
}
})(jQuery);


