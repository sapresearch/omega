function is_empty_html(html){
    return html.match(/\w+/) ? false :true
}
function service_detail_html(){
    return $('#service_detail').html();
}
function service_registration_html(){
    return $('#service_registration').html();
}


