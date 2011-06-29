  function find_service_by_id(services, id){
    if(isNaN(id)) return null;
    for(var i=0; i<services.length; i++){
      if(services[i].service.id == id)
        return services[i];
    }
    return null;
  }

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
    $("#title_category").hide();
    $("#service_detail_tab_link").html("Service Detail");
    $("#service_registration_tab_link").html("Registration Form");
    
    $("#service_name").val("new service")
    $("#service_level").val("leaf");
}
function set_inner_service_env(){
    $("#title_category").show();
    $("#service_detail_tab_link").html("Service Category Detail");
    $("#service_registration_tab_link").html("Registration Form Template");

    $("#service_name").val("new service category")
    $("#service_level").val("inner");
}
function set_service_detail_env(){
    $(".service_registration_only").hide()
}
function set_service_registration_env(){
    $(".service_registration_only").show()
}

//creating service
function create_service(status)
{
    $('#service_status').val(status);
    cancel_editing_element();

    if(!is_empty_html(service_detail_html()))
        $('#service_detail_html').val(service_detail_html())
    if(!is_empty_html(service_registration_html()))
        $('#service_registration_html').val(service_registration_html())

    $('#new_service').submit()
}
