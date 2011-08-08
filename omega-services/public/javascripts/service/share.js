// fix the problem service#destroy not rendering format.js when using respond_with
jQuery.ajaxSetup({ beforeSend: function (xhr) { xhr.setRequestHeader("Accept", "text/javascript"); } });

function is_empty_html(html){
    return html.match(/\w+/) ? false :true
}

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

function field_values_to_json(element_id, is_required_field_included){
    var field_values = is_required_field_included ? {"required":{}, "optional":{}} : {}
    $("#"+element_id+" label").each(function(){
        var target_id = $(this).attr("for")
        if(is_required_field_included)
        {
            if($(this).hasClass("required"))
                field_values.required[$(this).text()]=$("#"+target_id).val()
            else
                field_values.optional[$(this).text()]=$("#"+target_id).val()
        }
        else
            field_values[$(this).text()]=$("#"+target_id).val()
    })
    return field_values
}

function check_service_sections_count(){
    if(service_sections_count<=1)
        $('.delete_service_section').hide()
    else
        $('.delete_service_section').show()
    
    
}
function refresh_service_section_index(){
    $(".service_section_form .service_section_title").each(function(index){
        $(this).html("Section "+(index+1))
    })
}

function delete_service_section(element_id)
{
    service_sections_count -- ;
    $("#"+element_id).hide("slow", function(){
        $(this).remove();
        refresh_service_section_index()
    })
    check_service_sections_count() 
}