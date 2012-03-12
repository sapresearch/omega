function new_service_registration(service, url, from_page){
    
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
                    if ( validate_fields("new_service_registration") ) {
                        var registrant_id = $("#service-registration-new-dialog-form .select_registrant .contacts_list").val()
                        register_service(service.service.id, registrant_id, "pending", true, url, from_page)
                        $( this ).dialog( "close" );
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                $( "#service-registration-new-dialog-form" ).dialog('destroy')
                $( "#service-registration-new-dialog-form form ul").empty();
                $(".validateTips").html("Colored fields are required.")
                $(".ui-state-error").removeClass("ui-state-error");
            }
        });
    }
    else
    {
        $( "#service-registration-new-dialog-confirm" ).attr("title", service.service.name + " Registration")
        $( "#service-registration-new-dialog-confirm .confirm_question" ).html("Are you sure to register "+service.service.name+"?")
        $( "#service-registration-new-dialog-confirm" ).dialog({
            width: 'auto',
            modal: true,
            resizable: false,
            buttons: {
                "Register": function() {
                    var registrant_id = $("#service-registration-new-dialog-confirm .select_registrant .contacts_list").val()
                    register_service(service.service.id, registrant_id, "pending", false, url, from_page)
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                $( "#service-registration-new-dialog-confirm" ).dialog('destroy')
            }
        });
    }     
}

function register_service(service_id, registrant_id, status, has_form, url, from_page)
{    
    var data_hash={service_id:service_id, registrant_id:registrant_id, status:status, from_page:from_page}
    if(has_form)
        data_hash["field_values"] = JSON.stringify(field_values_to_json("new_service_registration", false))

    $.ajax({
        url: url,
        type: "POST",
        data: (data_hash)
    })
}