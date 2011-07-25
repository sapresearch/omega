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