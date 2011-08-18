// fix the problem service#destroy not rendering format.js when using respond_with
jQuery.ajaxSetup({ beforeSend: function (xhr) { xhr.setRequestHeader("Accept", "text/javascript"); } });

function service_detail_html(){
    return $('#service_detail').html();
}

function service_registration_html(){
    return $('#service_registration').html();
}

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
    $("#service_leaf_level_radio").attr("checked","checked")
    $("#title_category").hide();
    $("#service_detail_tab_link").html("Service Detail");
    $("#service_registration_tab_link").html("Registration Form");

    $("#service_name").select();
    $("#service_level").val(service_leaf_level);

    $('#service_section_info').show()
}
function set_branch_service_env(){
    $("#service_branch_level_radio").attr("checked","checked")
    $("#title_category").show();
    $("#service_detail_tab_link").html("Service Category Detail");
    $("#service_registration_tab_link").html("Registration Form Template");

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

//submit the service form
function submit_service_form(status)
{
    clean_service_form_html();
    $("input,textarea").removeAttr("disabled")
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

    $('.service_form').submit()
}


function back_to_index_confirm(url){
    $( "#back-to-index-dialog-confirm" ).dialog({
        resizable: false,
	height:200,
	modal: true,
	buttons: {
            "OK": function() {
		$( this ).dialog( "close" );
                window.location.href = url
            },
            Cancel: function() {
            	$( this ).dialog( "close" );
            }
	},
        close: function() {
            $( "#back-to-index-dialog-confirm" ).dialog('destroy')
        }
    });
}