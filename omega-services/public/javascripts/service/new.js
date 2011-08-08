  function refresh_service_detail(){
    var sid=$('#select_service_detail_templates').val();
    $('#service_detail').html(isNaN(sid) ? "" : find_service_by_id(services_with_detail_template,sid).service.service_detail_form.html)
    check_field_exists()
  }
  function refresh_service_registration(){
    var sid=$('#select_service_registration_templates').val();
    $('#service_registration').html(isNaN(sid) ? "" : find_service_by_id(services_with_registration_template,sid).service.service_registration_form.html)
    check_field_exists()
  }

// set environment for editing
function set_leaf_service_env(){
    $("#service_leaf_level_radio").attr("checked","checked")
    $("#title_category").hide();
    $("#service_detail_tab_link").html("Service Detail");
    $("#service_registration_tab_link").html("Registration Form");

    $('#service_name_preview').html("New Service")
    $("#service_name").val("New Service")
    $("#service_name").select();
    $("#service_level").val(service_leaf_level);

    $('#service_section_info').show()
}
function set_branch_service_env(){
    $("#service_branch_level_radio").attr("checked","checked")
    $("#title_category").show();
    $("#service_detail_tab_link").html("Service Category Detail");
    $("#service_registration_tab_link").html("Registration Form Template");

    $('#service_name_preview').html("New Service Category")
    $("#service_name").val("New Service Category")
    $("#service_name").select();
    $("#service_level").val(service_branch_level);

    $('#service_section_info').hide()
}
function set_service_detail_env(){
    $(".service_registration_only").hide()
    cancel_editing_element()
}
function set_service_registration_env(){
    $(".service_registration_only").show()
    cancel_editing_element()
}

// prepare clean html ready to save to database
function clean_service_form_html()
{
    cancel_editing_element();
    $('.hasDatepicker').removeClass('hasDatepicker');
}
//creating service
function create_service(status)
{
    clean_service_form_html();
    $('#service_status').val(status);

    if(!is_empty_html(service_detail_html()))
    {
        $('#service_detail_html').val(service_detail_html())
        $('#service_detail_field_values').val(JSON.stringify(field_values_to_json("service_detail", false)))
    }
    if(!is_empty_html(service_registration_html()))
    {
        $('#service_registration_html').val(service_registration_html())
        //$('#service_registration_field_values').val(JSON.stringify(field_values_to_json("service_registration", true))) //this might only be necessary in real registration
    }

    $('#new_service').submit()
}
