/*
	Hyperspace by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$sidebar = $('#sidebar');

		// Hack: Enable IE flexbox workarounds.
			if (skel.vars.IEVersion < 12)
				$body.addClass('is-ie');

		// Disable animations/transitions until the page has loaded.
			if (skel.canUse('transition'))
				$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Forms.

			// Fix: Placeholder polyfill.
				$('form').placeholder();

			// Hack: Activate non-input submits.
			/*	$('form.ajax').on('click','.submit', function(event) {

					// Stop propagation, default.
						event.stopPropagation();
						event.preventDefault();

					// Submit form.
						//$(this).parents('form').submit();
						alert('hello');

				});*/
				
				// Hack: Activate non-input submits.
				$('#submitLink').click(function(){
					
					var namePattern = /^[A-Za-z ]{3,20}$/;
					var emailPattern = /^[a-z 0-9 A-Z \.\+\_]+@[a-z A-Z 0-9]+\.[a-z A-Z]{2,4}$/;
					
					if(!namePattern.test($('#name').val()))
					{
						$("#nameError").show();
						return false;
					}
					else{
						$("#nameError").hide();
					}
					
					if(!emailPattern.test($('#email').val()))
					{
						$("#emailError").show();
						return false;
					}
					else{
						$("#emailError").hide();
					}
					
					if($('#message').val().length < 20)
					{
						$("#messageError").show();
						return false;
					}
					else{
						$("#messageError").hide();
					}
					
					
					$('#submitLink').addClass("disabled special");
					$('#submitLink').text("Sending...");
					
					$.ajax({url:"process.php",
							type:"POST",
							data:{name:$('#name').val(),email:$('#email').val(),message:$('#message').val()},
							success: function(returnValue){
						
									if(returnValue == 'success')
									{
										$('#submitLink').removeClass("disabled special");
										$('#submitLink').text("Sent!!");
										$('#name').val("");
										$('#email').val("");
										$('#message').val("");
									}
									else
									{
										$('#submitLink').removeClass("disabled special");
										$('#submitLink').text("Sending failed!! Click to Retry");
									}
					
							}});
					return false;
				});
				
				
				
		//function called on focusing of message text area
			$('#message').on("focus",function(){
				if($('#submitLink').text() == "Sent!!")
					$('#submitLink').text("Send Message");
			}
			);

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Sidebar.
			if ($sidebar.length > 0) {

				var $sidebar_a = $sidebar.find('a');

				$sidebar_a
					.addClass('scrolly')
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$sidebar_a.removeClass('active');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								top: '-20vh',
								bottom: '-20vh',
								initialize: function() {

									// Deactivate section.
										if (skel.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($sidebar_a.filter('.active-locked').length == 0) {

											$sidebar_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

			}

		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1000,
				offset: function() {

					// If <=large, >small, and sidebar is present, use its height as the offset.
						if (skel.breakpoint('large').active
						&&	!skel.breakpoint('small').active
						&&	$sidebar.length > 0)
							return $sidebar.height();

					return 0;

				}
			});

		// Spotlights.
			$('.spotlights > section')
				.scrollex({
					mode: 'middle',
					top: '-10vh',
					bottom: '-10vh',
					initialize: function() {

						// Deactivate section.
							if (skel.canUse('transition'))
								$(this).addClass('inactive');

					},
					enter: function() {

						// Activate section.
							$(this).removeClass('inactive');

					}
				})
				.each(function() {

					var	$this = $(this),
						$image = $this.find('.image'),
						$img = $image.find('img'),
						x;

					// Assign image.
						$image.css('background-image', 'url(' + $img.attr('src') + ')');

					// Set background position.
						if (x = $img.data('position'))
							$image.css('background-position', x);

					// Hide <img>.
						$img.hide();

				});

		// Features.
			if (skel.canUse('transition'))
				$('.features')
					.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function() {

							// Deactivate section.
								$(this).addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$(this).removeClass('inactive');

						}
					});

	});

})(jQuery);