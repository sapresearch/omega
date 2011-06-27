  //javascript object constructors
  function service_with_detail_template(service_json, detail_html){
    this.service_json = service_json
    this.detail_html = detail_html
  }
  function service_with_registration_template(service_json, registration_html){
    this.service_json = service_json
    this.registration_html = registration_html
  }

  function find_service_with_detail_template_by_id(services_with_detail_template, id){
    if(isNaN(id)) return null;
    for(var i=0; i<services_with_detail_template.length; i++){
      if(services_with_detail_template[i].service_json.service.id == id)
        return services_with_detail_template[i];
    }
    return null;
  }
  function find_service_with_registration_template_by_id(services_with_registration_template, id){
    if(isNaN(id)) return "";
    for(var i=0; i<services_with_registration_template.length; i++){
      if(services_with_registration_template[i].service_json.service.id == id)
        return services_with_registration_template[i];
    }
    return null;
  }

  function refresh_service_detail(){
    var sid=$('#select_service_detail_templates').val();
    $('#service_detail').html(isNaN(sid) ? "" : find_service_with_detail_template_by_id(services_with_detail_template,sid).detail_html)
  }
  function refresh_service_registration(){
    var sid=$('#select_service_registration_templates').val();
    $('#service_registration').html(isNaN(sid) ? "" : find_service_with_registration_template_by_id(services_with_registration_template,sid).registration_html)
  }
