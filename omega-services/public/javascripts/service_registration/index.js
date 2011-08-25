function update_service_registration_status(url, status){
    $("#service-registration-update-status-dialog-form input[value='"+status+"']").attr("checked","checked")
    $("#service-registration-update-status-dialog-form").dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "OK": function() {
                var new_status = $("#service-registration-update-status-dialog-form input[name='service_registration_status_radio']:checked").val()
                var sorted_column = get_service_registration_table_sorted_column()
                var sorting_method = get_service_registration_table_sorting_method(sorted_column)
                $( this ).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "PUT",
                    data:{status:new_status, sorted_column:sorted_column, sorting_method:sorting_method}
                })
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#service-registration-update-status-dialog-form" ).dialog('destroy')
        }
    });
}

function get_service_registration_table_sorted_column(){
    var n = null;
    $('#service_registrations_table thead tr th').each(function(index){
        if($(".DataTables_sort_wrapper .ui-icon", this).hasClass("ui-icon-triangle-1-n")||$(".DataTables_sort_wrapper .ui-icon", this).hasClass("ui-icon-triangle-1-s"))
            n = index;
    })
    return n;
}
function get_service_registration_table_sorting_method(column){
    var class_name = $('#service_registrations_table thead tr th .DataTables_sort_wrapper .ui-icon')[column].className
    if($.inArray("ui-icon-triangle-1-n", class_name.split(" "))>0)
        return "asc"
    else if($.inArray("ui-icon-triangle-1-s", class_name.split(" "))>0)
        return "desc"
    else
        return "none"
}

function show_service_registration(service_registration_id, field_values, show_html, edit_html, url){
    $("#service-registration-show-dialog-form").html(show_html)
    $("#service-registration-show-dialog-form").dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Edit": function() {
                $( this ).dialog( "close" );
                edit_service_registration(service_registration_id, field_values, edit_html, url);
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#service-registration-show-dialog-form" ).dialog('destroy')
            $("#service-registration-show-dialog-form").empty()
        }
    });
}

function edit_service_registration(service_registration_id, field_values, edit_html, url){
    //var registration_html = service.service.service_registration_form.html
    $( "#service-registration-edit-dialog-form").html(edit_html)
    $('.date_picker').datepicker()

    fill_field_values("edit_service_registration", field_values);
    
    $("#service-registration-edit-dialog-form").dialog({
        width: 620,
        modal: true,
        resizable: false,
        buttons: {
            "Update": function() {
                update_service_registration(service_registration_id, url)
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#service-registration-edit-dialog-form" ).dialog('destroy')
            $( "#service-registration-edit-dialog-form" ).empty()
        }
    });
}

function update_service_registration(service_registration_id, url){
    var data_hash={id:service_registration_id}
    data_hash["field_values"] = JSON.stringify(field_values_to_json("edit_service_registration", false))
    data_hash["sorted_column"] = get_service_registration_table_sorted_column()
    data_hash["sorting_method"] = get_service_registration_table_sorting_method(data_hash["sorted_column"])

    $.ajax({
        url: url,
        type: "PUT",
        data: (data_hash)
    })
}


function switch_block_service_registration(url){
    var type = $("#block_registration_checkbox").is(":checked") ? "block" : "unblock";
    var data = {"type":type}

    $.ajax({
        url: url,
        type: "PUT",
        data: data,
        dataType: 'script',
        cache: false
    })
}