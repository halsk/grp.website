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