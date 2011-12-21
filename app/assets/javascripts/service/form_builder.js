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
    $("#"+element_id).append(prepare_field(text_field("New Text", {"maxlength":100})))
    check_field_exists();
}
function append_text_area(element_id){
    $("#"+element_id).append(prepare_field(text_area("New Text", {"maxlength":300})))
    check_field_exists();
}
function append_select_list(element_id){
    $("#"+element_id).append(prepare_field(select_list("New Select", {}, {"option1":"option1", "option2":"option2"})))
    check_field_exists();
}
function append_date_picker(element_id){
    var attributes_hash = {}
    if(element_id=="service_registration")
        attributes_hash["value"]=""
    $("#"+element_id).append(prepare_field(date_picker("New Date", attributes_hash)))
    check_field_exists();
}

//functions to generate html for editing different field elements
function edit_field_required(label_element_id){
    var html = "<div>"
    html += "<label id='field_required_label' for='field_required_checkbox' >Field Required?</label>"
    html += "<input id='field_required_checkbox' type='checkbox' "
    html += "onclick='if($(this).is(\":checked\")) $(\"#"+label_element_id+"\").addClass(\"required\"); else $(\"#"+label_element_id+"\").removeClass(\"required\");' />"
    html += "</div>"
    return html;
}
function edit_field_format(label_element_id){
    var html = "<div>"
    html += "<label id='field_format_label' for='field_format_select' >Format:</label>"
    html += "<select id='field_format_select' onchange='add_format_validation_to_field(\""+label_element_id+"\", $(this).val())'>"
    html += "<option value='none'>None</option>"
    html += "<option value='name'>Name</option>"
    html += "<option value='email'>Email</option>"
    html += "<option value='number'>Number</option>"
    html += "</select>"
    html += "</div>"
    return html;
}
function get_edit_field_length(){
    var lower_bound = parse_non_negative_integer($('#field_length_lower_bound').val())
    var upper_bound = parse_unlimited_non_negative_integer($('#field_length_upper_bound').val())
    return lower_bound+"-"+upper_bound
}
function edit_field_length(label_element_id){
    var html = "<div>"
    
    html += "<label id='field_length_label' >Length Limit:</label><br/>"
    html += "<input id='field_length_lower_bound' class='non_negative_integer' type='text' value='0' "
    html += "onkeyup='add_length_validation_to_field(\""+label_element_id+"\", get_edit_field_length())' />"
    html += "to"
    html += "<input id='field_length_upper_bound' class='unlimited_non_negative_integer' type='text' value='unlimited' "
    html += "onkeyup='add_length_validation_to_field(\""+label_element_id+"\", get_edit_field_length())' />"
    
    html += "</div>"
    html += "<script>set_unlimited_non_negative_integer_field('field_length_upper_bound')</script>"
    html += "<script>set_non_negative_integer_field('field_length_lower_bound')</script>"
    return html;
}

function edit_label(label_element_id){
    var html = "Label:"
    html += "<input id='text_field_edit_label' type='text' value='"+$("#"+label_element_id).html()+"' "
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

function load_edit_field_settings(label_element_id){
    var element = $("#"+label_element_id)
    if(element.hasClass("required"))
        $("#field_required_checkbox").attr("checked","checked")
    else
        $("#field_required_checkbox").removeAttr("checked")

    var format = element.attr("data-format")
    if(format!=undefined)
        $("#field_format_select").val(format);

    var length = element.attr("data-length")
    if(length!=undefined){
        var lengths = length.split("-")
        var lower_bound = lengths[0];
        var upper_bound = lengths[1];
        $("#field_length_lower_bound").val(lower_bound);
        $("#field_length_upper_bound").val(upper_bound);
    }
}

// validations
function add_format_validation_to_field(label_element_id, format){
    var element = $("#"+label_element_id)
    if(format=="none")
        element.removeAttr("data-format")
    else
        element.attr("data-format", format);
}
function add_length_validation_to_field(label_element_id, length){
    var element = $("#"+label_element_id)
    if(length=="0-unlimited")
        element.removeAttr("data-length");
    else
        element.attr("data-length", length);
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
    if(active_service_section_element_id()=="service_detail"){
        if(is_empty_html(service_detail_html())){
            $("#check_service_detail_template").css("visibility", "hidden")
            $("#has_service_detail_template").removeAttr("checked")
            cancel_editing_element();
        }else
            $("#check_service_detail_template").css("visibility", "visible")
    }else{
        if(is_empty_html(service_registration_html())){
            $("#check_service_registration_template").css("visibility", "hidden")
            $("#has_service_registration_template").removeAttr("checked")
            cancel_editing_element();
        }else
            $("#check_service_registration_template").css("visibility", "visible")
    }
}

// delete a field
function delete_field(element_id)
{
    $("#"+element_id).hide("slow", function(){ $(this).remove();check_field_exists(); })
    if(element_id==editing_element_id())
        cancel_editing_element();
}

// return the currently active service section element id
function active_service_section_element_id(){
    return $('#service_detail').is(':visible') ? 'service_detail' : 'service_registration'
}

// highlight element being edited
function set_editing_element(element_id){
    $(".editing").removeClass("editing");
    $("#"+element_id).addClass("editing");
    $("#edit_guide").hide();
    $("#edit_content").empty();
    $("#edit_validation").empty();
}

function editing_element_id(){
    return $(".editing").attr("id")
}

function cancel_editing_element(){
    $(".editing").removeClass("editing");
    $("#edit_guide").show()
    $("#edit_content").empty();
    $("#edit_validation").empty();
}

//***** app-spec
function field_operation_links(){
  return "<div class='item-list-actions-wrapper corners' >\
            <div class='item-list-actions'>\
              <span class='om-plain-icon-button' onclick='edit_field($(this).parents(\"li\").attr(\"id\"))'>\
                <span class='om-icon om-icon-edit'></span>\
                <span class='edit-ui-em'>Edit</span>\
              </span>\
              <span class='om-plain-icon-button' onclick='delete_field($(this).parents(\"li\").attr(\"id\"))'>\
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
    set_editing_element(parent_element_id)
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
                        $("#edit_content").html(edit_date_picker(field.id))
                    else
                        $("#edit_content").html(edit_text_field(field.id))
                    break;
                default:
                    break;
            }
            break;
        case "textarea":
        case "TEXTAREA":
            $("#edit_content").html(edit_text_area(field.id))
            break;
        case "select":
        case "SELECT":
            $("#edit_content").html(edit_select_list(field.id))
            break;
        default:
            break;
    }
    $("#edit_content").prepend(edit_label(label.id))
    if(active_service_section_element_id()=="service_registration")
    {
        $("#edit_validation").append(edit_field_required(label.id))
        if(target_of(label.id).attr("type")=="text")
        {
            $("#edit_validation").append(edit_field_format(label.id))
            $("#edit_validation").append(edit_field_length(label.id))
        }else if(field.nodeName=="textarea" || field.nodeName=="TEXTAREA"){
            $("#edit_validation").append(edit_field_length(label.id))
        }
        load_edit_field_settings(label.id);
    }    
    $("#admin-edit-em").effect("highlight")
    $("#text_field_edit_label").select();
}
//***** end app-spec


