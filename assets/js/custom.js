// GRP Namespace
GRP = {};

(function($){
	$.getUrlVar = function(key){
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
		return result && unescape(result[1]) || ""; 
	};
})(jQuery);

jQuery(document).ready(function() {

	$(".open-modal").bind('click focus', function () {
		$('#modalSubscribe').modal('show');
		$("#modalSubscribe form:not(.filter) :input:visible:enabled:first").focus();
	});

	if($.getUrlVar('status') == 'success') {
		$('body > .container:first > div:first').prepend('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message[$.getUrlVar('msg')] + '</div>');
	}

	if($.getUrlVar('status') == 'error') {
		$('body > .container:first > div:first').prepend('<div class="alert alert-danger"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message[$.getUrlVar('msg')] + '</div>');
	}

	if($.getUrlVar('email').length > 0) {
		$("input[name='email']").val($.getUrlVar('email'));
	}

	$('button.sendy').bind('click', function (evt) {

		var form = $(this.form);
		var btn = $(this);
		btn.button('loading');

		var name = [];
		name.push($("input[name='Last']",form).val());
		name.push($("input[name='First']",form).val());
		$("input[name='name']",form).val(name.join(' '));

		$.post(
			form[0].action, 
			form.serialize(), 
			function (response) {
				btn.button('reset');

				if (true) {
					switch (response) {
						case 'Some fields are missing.':
							form[0].prepend('<div class="alert alert-danger"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.a + '</div>');
							break;

						case 'Invalid email address.':
							form.prepend('<div class="alert alert-danger"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.b + '</div>');
							break;

						case 'Already subscribed.':
							$('body > .container:first > div:first').prepend('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.e + '</div>');
							form[0].reset();
							$('#modalSubscribe').modal('hide');
							window.scrollTo(0,0);
							break;

						default:
							if (form[0].action.split('/').pop() == 'subscribe') {
								$('body > .container:first > div:first').prepend('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.d + '</div>');
							}
							else {
								$('body > .container:first > div:first').prepend('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.f + '</div>');
							}

							form[0].reset();
							$('#modalSubscribe').modal('hide');
							window.scrollTo(0,0);
							break;
					}
				}
				else {
					form[0].prepend('<div class="alert alert-danger"><a class="close" data-dismiss="alert" href="#" aria-hidden="true">&times;</a>' + message.c + '</div>');
				}
			}
		);
	});

});
