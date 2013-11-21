/**
 *
 *
 */

// GRP Namespace
GRP = {};

jQuery(document).ready(function() {
	GRP.parseRSS('http://blog.georepublic.info/atom.xml', function (data) {
		$.each(data.entries, function (idx,entry) {
			if (idx <= 3) {
				var post = '<dl class="dl-horizontal"><dt><a href="' + entry.link 
							+ '"><img src="/assets/img/seal1-georepublic.png" alt="" /></a></dt><dd><p><a href="' + entry.link + '">' 
							+ entry.contentSnippet + '</a></p></dd></dl>';
				$('.footer .posts').append(post);
			}
		});		
	});

	$('button.subscribe').bind('click', function (evt) {
		$.post(
			$(this.form)[0].action, 
			$(this.form).serialize(), 
			function (response) {
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							alert("Some fields are missing.");
							break;

						case 'Invalid email address.':
							alert("Invalid email address.");
							break;

						case 'Invalid list ID.':
							alert("Invalid list ID.");
							break;

						default:
							alert("You're subscribed!");
							break;
					}
				}
				else {
					alert("Sorry, unable to subscribe. Please try again later!");
				}			
			}
		);
	});

	$('button.message').bind('click', function (evt) {
		$.post(
			$(this.form)[0].action, 
			$(this.form).serialize(), 
			function (response) {
				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							alert("Some fields are missing.");
							break;

						case 'Invalid email address.':
							alert("Invalid email address.");
							break;

						case 'Invalid list ID.':
							alert("Invalid list ID.");
							break;

						default:
							alert("You're message has been sent!");
							break;
					}
				}
				else {
					alert("Sorry, unable to send a message. Please try again later!");
				}			
			}
		);
	});
});

/**
 *	Parse RSS feed
 */
GRP.parseRSS = function (url, callback) {
	$.ajax({
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
			callback(data.responseData.feed);
		}
	});
}