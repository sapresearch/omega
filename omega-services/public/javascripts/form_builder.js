function text_field(attributes_hash){
    var html = "<input "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += "type='text' />"
    return html
}
function text_area(attributes_hash, inner_html){
    var html = "<textarea "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += ">"
    html += inner_html
    html += "<textarea/>"
    return html
}
function select_list(){
    
}
function data_picker(){
    
}
function label(){
    
}
function checkbox(){
    
}
function radio_button(){
    
}

function element_operation_links(){
    
}
