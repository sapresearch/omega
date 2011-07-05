function updateTips( t ) {
        tips = $( ".validateTips" );
	tips
		.text( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function checkLength( o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( "Length of " + n + " must be between " +
			min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n );
		return false;
	} else {
		return true;
	}
}

function new_service_registration(service_id){
    var service = find_service_by_id(services, service_id);
    
    if(service.service.service_registration_form)
    {
        var registration_html = service.service.service_registration_form.html
        $( "#service-registration-new-dialog-form" ).attr("title", service.service.name + " Registration")
        $( "#service-registration-new-dialog-form form ul").html(registration_html)
        $('.date_picker').datepicker()

        //var allFields = $( [] ).add()

        $( "#service-registration-new-dialog-form" ).dialog({
        //    autoOpen: false,
        //    height: 600,
            width: 620,
            modal: true,
            resizable: false,
            buttons: {
                "Register": function() {
                    var bValid = true;
                                    /*
                                    allFields.removeClass( "ui-state-error" );

                                    bValid = bValid && checkLength( name, "username", 3, 16 );
                                    bValid = bValid && checkLength( email, "email", 6, 80 );
                                    bValid = bValid && checkLength( password, "password", 5, 16 );

                                    bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
                                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                                    bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                                    bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
                                    */
                    if ( bValid ) {
                        register_service(service_id, "pending", true)
                        $( this ).dialog( "close" );
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                //allFields.val( "" ).removeClass( "ui-state-error" );
            }
        });
    }
    else
    {
        $( "#service-registration-new-dialog-confirm" ).attr("title", service.service.name + " Registration")
        $( "#service-registration-new-dialog-confirm" ).dialog({
            modal: true,
            resizable: false,
            buttons: {
                "Register": function() {
                    register_service(service_id, "pending", false)
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    }     
}

function register_service(service_id, status, has_form)
{
    var data_hash={service_id:service_id, status:status}
    if(has_form)
        data_hash["field_values"] = JSON.stringify(field_values_to_json("new_service_registration", false))
    
    $.ajax({
        url: service_registrations_url,
        type: "POST",
        data: (data_hash),
        success: function(msg){
            $( "#service-registration-created-dialog-message" ).dialog({
                resizable: false,
                modal: true,
                buttons: {
                    Ok: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        }
    })
}