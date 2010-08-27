$(function() {
		/*
	 * Set default setting for validator plugin
	 */
	jQuery.validator.setDefaults({
		errorElement: "span",
		highlight: function(element, errorClass) {
			$(element).addClass('inputInvalid')
		},
		unhighlight: function(element, errorClass) {
			$(element).removeClass('inputInvalid').addClass('inputValid');

		}
	});

	 //prevent the template for additional address fields from getting validated
	 $.validator.addClassRules({
				 validate_presence: {
						required: function(element) { return !(/_ID_/.test(element.id)); }
				 }
			});
	// validate the new contact form
	$('.new_contact').validate(
	{
		ignore: ':hidden',
		rules: {
			"contact[first_name]": {
				required: true,
				minlength: 2
			},
			"contact[last_name]":  {
				required: true,
				minlength: 2
			},
			"contact[email]":
			{
				email : true,
				required: true,
				minlength: 6
			}


		}

	})
})