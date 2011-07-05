// functions to generate html for different field elements
function label(inner_html, attributes_hash){
    var time_stamp = new Date().getTime();
    var default_label_id = "label_"+time_stamp;
    var html = "<label "
    html += attributes_hash["id"] ? "" : "id='"+default_label_id+"' "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += ">"
    html += inner_html==undefined ? "" : inner_html
    html += "</label>"
    return html
}
function text_field(label_inner_html, attributes_hash){
    var time_stamp = new Date().getTime();
    var default_text_field_id = "text_field_"+time_stamp;
    var id = attributes_hash["id"] ? attributes_hash["id"] : default_text_field_id
    var html = label_inner_html!=null ? label(label_inner_html, {"for":id}) : ""
    
    html += "<input "
    html += attributes_hash["id"] ? "" : "id='"+default_text_field_id+"' "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += "type='text' />"
    return html
}
function text_area(label_inner_html, attributes_hash, inner_html){
    var time_stamp = new Date().getTime();
    var default_text_area_id = "text_area_"+time_stamp;
    var id = attributes_hash["id"] ? attributes_hash["id"] : default_text_area_id
    var html = label_inner_html!=null ? label(label_inner_html, {"for":id}) : ""

    html += "<textarea "
    html += attributes_hash["id"] ? "" : "id='"+default_text_area_id+"' "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += ">"
    html += inner_html==undefined ? "" : inner_html
    html += "</textarea>"
    return html
}
function select_list(label_inner_html, attributes_hash, options_hash){
    var time_stamp = new Date().getTime();
    var default_select_list_id = "select_list_"+time_stamp;
    var id = attributes_hash["id"] ? attributes_hash["id"] : default_select_list_id
    var html = label_inner_html!=null ? label(label_inner_html, {"for":id}) : ""

    html += "<select "
    html += attributes_hash["id"] ? "" : "id='"+default_select_list_id+"' "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += ">"
    for(var option_text in options_hash)
        html += ("<option value='"+options_hash[option_text]+"'>"+option_text+"</option>")
    html += "</select>"
    return html
}
function date_picker(label_inner_html, attributes_hash){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate()
   
    attributes_hash["class"]="date_picker"
    if(attributes_hash["value"]==null)
        attributes_hash["value"]=year+"-"+(month<10 ? "0"+month : month)+"-"+(day<10 ? "0"+day : day)

    var time_stamp = date.getTime();
    var default_date_picker_id = "date_picker_"+time_stamp;
    var id = attributes_hash["id"] ? attributes_hash["id"] : default_date_picker_id
    var html = label_inner_html!=null ? label(label_inner_html, {"for":id}) : ""

    html += "<input "
    html += attributes_hash["id"] ? "" : "id='"+default_date_picker_id+"' "
    for(var attribute_name in attributes_hash)
        html += (attribute_name + "='" + attributes_hash[attribute_name]+ "' ")
    html += "type='text' />"
    html += "<script type='text/javascript'>$('#"+id+"').datepicker();</script>"
    return html;
}
function checkbox(){
    
}
function radio_button(){
    
}

//functions to append a field inside an element visually
function append_text_field(element_id){
    $("#"+element_id).append(prepare_field(text_field("new text", {"maxlength":100})))
    check_field_exists();
}
function append_text_area(element_id){
    $("#"+element_id).append(prepare_field(text_area("new text", {"maxlength":300})))
    check_field_exists();
}
function append_select_list(element_id){
    $("#"+element_id).append(prepare_field(select_list("new select", {}, {"option1":"option1", "option2":"option2"})))
    check_field_exists();
}
function append_date_picker(element_id){
    var attributes_hash = {}
    if(element_id=="service_registration")
        attributes_hash["value"]=""
    $("#"+element_id).append(prepare_field(date_picker("new date", attributes_hash)))
    check_field_exists();
}

//functions to generate html for editing different field elements
function required_checkbox(label_element_id){
    var html = "<input id='required_checkbox' type='checkbox' "
    if($("#"+label_element_id).hasClass("required"))
        html += "checked='checked'"
    html += "onclick='if($(this).is(\":checked\")) $(\"#"+label_element_id+"\").addClass(\"required\"); else $(\"#"+label_element_id+"\").removeClass(\"required\");' />"
    html += "<label id='required_label' for='required_checkbox' >Is this field required?</label>"
    return html;
}
function edit_label(label_element_id){
    var html = "Label:"
    html += "<input type='text' value='"+$("#"+label_element_id).html()+"' "
    html += "onkeyup='$(\"#"+label_element_id+"\").html($(this).val())' />"
    return html;
}
function edit_text_field(text_field_element_id){
    var html = "Value:"
    html += "<input type='text' value='"+$("#"+text_field_element_id).val()+"' "
    html += "onkeyup='$(\"#"+text_field_element_id+"\").val($(this).val())' />"
    return html;
}
function edit_text_area(text_area_element_id){
    var html = "Content:"
    html += "<textarea onkeyup='$(\"#"+text_area_element_id+"\").val($(this).val())'>"+$("#"+text_area_element_id).val()+"</textarea>"
    return html;
}
function edit_select_list(select_list_element_id){
    var html = "Options:"
    html += "<textarea onkeyup='$(\"#"+select_list_element_id+"\").html(str_to_options_html($(this).val()))'>"
    var options = document.getElementById(select_list_element_id).options
    for(var i=0; i<options.length; i++)
        html+=options[i].innerHTML+"\n"
    html += "</textarea>"
    return html;
}
function edit_date_picker(date_picker_element_id){
    var html = "Date:"
    html += "<input id='edit_date_picker' class='date_picker' type='text' value='"+$("#"+date_picker_element_id).val()+"' />"
    html += "<script type='text/javascript'>\
                $('#edit_date_picker').datepicker({\
                    onSelect: function(date_text, inst) {\
                        $('#"+date_picker_element_id+"').val(date_text);\
                    }\
                });\
            </script>"
    return html;
}

// parse a string into options html for inserting into <select></select>
function str_to_options_html(str){
    var strs = str.split("\n")
    var html = ""
    for(var i=0; i<strs.length; i++)
    {
        strs[i]=jQuery.trim(strs[i])
        if(strs[i].length>0)
            html += "<option value="+strs[i]+" >"+strs[i]+"</option>"
    }
    return html;
}

// hide or show the checkbox for making template depending on if the fields are empty.
function check_field_exists(){
    is_empty_html(service_detail_html()) ? $("#check_service_detail_template").css("visibility", "hidden") : $("#check_service_detail_template").css("visibility", "visible")
    is_empty_html(service_registration_html()) ? $("#check_service_registration_template").css("visibility", "hidden") : $("#check_service_registration_template").css("visibility", "visible")
}

//delete an element with visual effect
function delete_element(element_id)
{    
    $("#"+element_id).hide("slow", function(){ $(this).remove(); check_field_exists();})
    cancel_editing_element();    
}

// return the currently active service section element id
function active_service_section_element_id(){
    return $('#service_detail').is(':visible') ? 'service_detail' : 'service_registration'
}

// highlight element being edited
function editing_element(element_id){
    $(".editing").removeClass("editing");
    $("#"+element_id).addClass("editing");
}

//***** app-spec
function cancel_editing_element(){
    $(".editing").removeClass("editing");
    $("#admin-edit-em").html("Hover over the field you want to edit or delete to choose from the two options")
}
function field_operation_links(){
  return "<div class='item-list-actions-wrapper corners' >\
            <div class='item-list-actions'>\
              <span class='om-plain-icon-button' onclick='edit_field($(this).parents(\"li\").attr(\"id\"))'>\
                <span class='om-icon om-icon-edit'></span>\
                <span class='edit-ui-em'>Edit</span>\
              </span>\
              <span class='om-plain-icon-button' onclick='delete_element($(this).parents(\"li\").attr(\"id\"))'>\
                <span class='om-icon om-icon-delete'></span>\
                <span class='delete-ui-em'>Delete</span>\
              </span>\
            </div>\
          </div>"
}
function prepare_field(field_html){
    return "<li id='li_"+new Date().getTime()+"' class='relative' ondblclick='edit_field(this.id)' >"+field_operation_links()+field_html+"</li>"
}
function edit_field(parent_element_id){
    editing_element(parent_element_id)
    var label = $("#"+parent_element_id).children()[1]
    var field = $("#"+parent_element_id).children()[2]
    switch(field.nodeName)
    {
        case "input":
        case "INPUT":
            switch(field.type)
            {
                case "text":
                case "TEXT":
                    if($("#"+field.id).hasClass("date_picker"))
                        $("#admin-edit-em").html(edit_date_picker(field.id))
                    else
                        $("#admin-edit-em").html(edit_text_field(field.id))
                    break;
                default:
                    break;
            }
            break;
        case "textarea":
        case "TEXTAREA":
            $("#admin-edit-em").html(edit_text_area(field.id))
            break;
        case "select":
        case "SELECT":
            $("#admin-edit-em").html(edit_select_list(field.id))
            break;
        default:
            break;
    }
    $("#admin-edit-em").prepend(edit_label(label.id))
    if(active_service_section_element_id()=="service_registration")
        $("#admin-edit-em").append(required_checkbox(label.id))
    $("#admin-edit-em").effect("highlight")
}
//***** end app-spec
