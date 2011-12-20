// fix the problem service#destroy not rendering format.js when using respond_with
jQuery.ajaxSetup({ beforeSend: function (xhr) { xhr.setRequestHeader("Accept", "text/javascript"); } });

function service_detail_html(){
    return $.trim($('#service_detail').html());
}

function service_registration_html(){
    return $.trim($('#service_registration').html());
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
    $("#service_detail_tab_link").html("Service Detail");
    $("#service_registration_tab_link").html("Registration Form");

    $("#service_name").select();
    $("#service_level").val(service_leaf_level);

    $('.service_leaf_specific').show();
    $('.service_branch_specific').hide();
}
function set_branch_service_env(){
    $("#service_branch_level_radio").attr("checked","checked")
    $("#service_detail_tab_link").html("Service Category Detail");
    $("#service_registration_tab_link").html("Registration Form Template");

    $("#service_name").select();
    $("#service_level").val(service_branch_level);
    $("#service_price").val("0.0");

    $('.service_leaf_specific').hide();
    $('.service_branch_specific').show();
}
function set_service_detail_env(){
    $(".service_registration_only").hide()
    cancel_editing_element()
}
function set_service_registration_env(){
    $(".service_registration_only").show()
    cancel_editing_element()
}

function set_super_service_env(){
    var super_service_name = $("#service_super_service_id option:selected").text();
    if(super_service_name=="None")
        $("#title_super_service").html("")
    else
        $("#title_super_service").html(" in "+super_service_name)
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


function updateTips( t ) {
    var tips = $( ".validateTips" );
    tips.text( t ).addClass( "ui-state-highlight" );
    setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
}

function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
	o.addClass( "ui-state-error" );
        o.focus();
	updateTips( "Length of " + n + " must be between " +
            min + " ~ " + max + "." );
	return false;
    } else {
        return true;
    }
}

function checkRequired(o, n){
    if ( $.trim(o.val().length) == 0 ) {
	o.addClass( "ui-state-error" );
        o.focus();
	updateTips( n + " is required." );
	return false;
    } else {
        return true;
    }
}

function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
	o.addClass( "ui-state-error" );
        o.focus();
	updateTips( n );
	return false;
    } else {
	return true;
    }
}
function validate_fields(parent_element_id){
    var all_labels = $("#"+parent_element_id+" label")
    var valid = true;

    all_labels.each(function(){
        var field = target_of($(this).attr("id"))
        field.removeClass("ui-state-error")
        
        if($(this).hasClass("required"))
            valid = valid && checkRequired( field, $(this).text());
        if($(this).attr("data-length")){
            var lengths = $(this).attr("data-length").split("-")
            var min = lengths[0];
            var max = lengths[1];
            valid = valid && (checkLength( field, $(this).text(), min, max ) || is_empty_html(field.val()) );
        }
        if($(this).attr("data-format")=="email")
            valid = valid && (checkRegexp( field, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. user@omega.com" ) || is_empty_html(field.val()) );
        if($(this).attr("data-format")=="number")
            valid = valid && (checkRegexp( field, /^\d+$/i, $(this).text()+" must be a number" ) || is_empty_html(field.val()) );
        if($(this).attr("data-format")=="name")
            valid = valid && (checkRegexp( field, /^[a-z]([0-9a-z_])*$/i, $(this).text()+" may consist of a-z, 0-9, underscores, begin with a letter." ) || is_empty_html(field.val()) );
    })
    
    return valid;
}