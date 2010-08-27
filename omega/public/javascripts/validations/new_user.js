$(function(){
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

	$('#new_user').validate(
	{
		rules: {

            "user[username]": {
                required: true,
                minlength: 2
            },
			"user[first_name]":  {
                required: true,
                minlength: 2
            },
			"user[last_name]":  {
                required: true,
                minlength: 2
            },
			"user[email]":
			{
				email : true,
				required: true,
				minlength: 6
			},
			"user[password]":
			{
				required: true,
				minlength: 5
			}
		}
        })
})