$(function() {
	$('form a[data-new-nested]').live('click',function () {
		var association = $(this).attr('data-new-nested');
		var template    = $('#' + association + '_fields_template').html();
		var new_id      = new Date().getTime();
		var content     = template.replace(/_ID_/g, new_id);

		var fields = $(content).insertBefore($(this));
		fields.siblings('input[name*=_template]').remove();
		return false;
	});

	// Use live('click') to fire for new nested fields' remove link
	$('form a[data-remove-nested]').live('click', function() {
		// There is a hidden input called _destroy for each nested item, set it to true to tell rails to destroy
		var _destroy_field = $(this).prev('input[name*=_destroy]').val('true');

		$(this).parent().hide();
		return false;
	});
});