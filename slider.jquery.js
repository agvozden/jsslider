/*
 * Jquery Slider left / right
 * by agvozden
 * aleksandar@gvozden.info
 */
(function($) {
$.fn.slider = function(options) {
	settings=jQuery.extend({
		prevButton:		'#slider-prev',
		nextButton:		'#slider-next',
		autoscroll:		5000,
		duration:		1000,
		step:			0
	}, options);

	this.each(function(i, one) {
		
		// instance
		if (!$(one).data('slider')) $(one).data('slider', $(i));
		else return $(i); 

		// Setting variables...
		var $this = $(one);	// This box - component
		var slideAct = false;
		
		var btn = {};
		btn.prev = $(settings.prevButton);
		btn.next = $(settings.nextButton);

		var set=jQuery.extend({
			// Inherit settings value from default
			autoscroll:	settings.autoscroll,
			duration: settings.duration,
			step: settings.step
		});

		function setAutoScroll() {
			myTimer = setInterval(function() {autoScroll();}, set.autoscroll);
			$this.data("autoscroll", set.autoscroll);
		}

		function autoScroll(){
			if ($this.data("autoscroll"))
			slidenext();
		}
		
		function slidenext(){
			if (slideAct) return false;
			slideAct = true;
			var current = $this.children('li.show');
			if (current.next('li').length){
				var next = current.next('li');
				next.css('display', 'block').addClass('show');
				current.animate({marginLeft:'-'+set.step}, set.duration, function(){
					current.css({display: 'none',marginLeft:'0'}).removeClass('show');
					slideAct = false;
				});
			} else {
				var first = $this.children('li:first');
				$this.append(first.clone());
				var next = current.next('li');
				next.css('display', 'block').addClass('show');
				current.animate({marginLeft:'-'+set.step}, set.duration, function(){
					current.css({display: 'none',marginLeft:'0'}).removeClass('show');
					first.css('display', 'block').addClass('show');
					next.remove();
					slideAct = false;
				});
			}
		}

		function slideprev(){
			if (slideAct) return false;
			slideAct = true;
			var current = $this.children('li.show');
			if (current.prev('li').length){
				var prev = current.prev('li');
				prev.css({marginLeft:'-'+set.step, display:'block'}).addClass('show');
				prev.animate({marginLeft:'0'}, set.duration, function(){
					current.css('display', 'none').removeClass('show');
					slideAct = false;
				});
			} else {
				var last = $this.children('li:last');
				$this.prepend(last.clone());
				var prev = current.prev('li');
				prev.css({marginLeft:'-'+set.step, display:'block'}).addClass('show');
				prev.animate({marginLeft:'0'}, set.duration, function(){
					current.css('display', 'none').removeClass('show');
					last.css('display', 'block').addClass('show');
					prev.remove();
					slideAct = false;
				});
			}
		}
		
		// Initialise
		$(function(){
			
			var viewport = 0;
			$this.children('li').each(function() {
				viewport += $(this).outerWidth( true );
			});
			$this.css('width', viewport+'px');		

			$this.children('li').css('display', 'none');
			$this.children('li:first').css('display', 'block').addClass('show');
			if (set.step==0){
				set.step = $this.children('li').innerWidth()+'px';
			}

			btn.prev.click(slideprev);
			btn.next.click(slidenext);
				
			// set autoscroll
			if (set.autoscroll){
				setAutoScroll();
			}				

		});
		
	});

	return this;
}
})(jQuery);
