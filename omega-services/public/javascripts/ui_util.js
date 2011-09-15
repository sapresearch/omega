//delete an element with visual effect
function delete_element(element_id)
{
    $("#"+element_id).hide("slow", function(){ $(this).remove(); })
}

function nl2br(str)
{
    return str.replace(/\n/g,'<br/>')
}

function blank_sign(text){
    return "<span class='blank_sign'>"+text+"</span>"
}

function target_id(label_id){
    return $('#'+label_id).attr("for");
}
function target_of(label_id){
    return $("#"+target_id(label_id));
}

function is_empty_html(html){
    return html.match(/\w+/) ? false :true
}

function vertical_td(){
    
}

function fill_field_values(element_id, field_values){
    JSON.parse(field_values, function(key, val){
        $("#"+element_id+" label").each(function(){
            if($(this).html()==key)
            {
                var target_id = $(this).attr("for")
                $("#"+target_id).val(val)
            }
        })
    })
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

//dialogs
function show_dialog_message(dialog_id){
    var dialog = $("#"+dialog_id)
    dialog.dialog({
        resizable: false,
        modal: true,
        buttons: {
            Ok: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
            dialog.dialog('destroy')
        }
    });
}
function dialog_confirm(id, title, content_html, url, method, async, options){
    var default_options={
        "width":"auto",
        "height":"auto",
        "minWidth":150,
        "minHeight":150,
        "maxWidth":300
    }
    for(var key in default_options){
        if(options[key]==null || options[key]==undefined)
            options[key]=default_options[key]
    }
    
    var html = "<div id='"+id+"' class='dialog' title='"+title+"'>"
    html += content_html;
    html += "</div>"
    var dialog = $(html)
    dialog.dialog({
        resizable: false,
        width:options["width"],
        height:options["height"],
        minWidth:options["minWidth"],
        minHeight:options["minHeight"],
        maxWidth:options["maxWidth"],
	modal: true,
	buttons: {
            OK: function() {
		$(this).dialog( "close" );
                $.ajax({ url:url, type:method, async:async, dataType: "script" })
            },
            Cancel: function() {
            	$(this).dialog( "close" );
            }
	},
        close: function() {
            dialog.dialog('destroy')
        }
    });
}

function switch_status(id, url, method, data_hash){
    var val = $("#"+id).is(":checked") ? "on" : "off";
    var data = data_hash;
    data["switch"] = val
    $.ajax({
        url: url,
        type: method,
        data: data,
        dataType: 'script',
        cache: false
    })
}

function set_unlimited_non_negative_integer_field(element_id){
    var element = $("#"+element_id)
    element.click(function(){
        var parsed_value = parseInt($(this).val(), 10)
        if(isNaN(parsed_value))
            $(this).select();
    })
    element.keyup(function(){
        var parsed_value = parseInt($(this).val(), 10)
        if(isNaN(parsed_value)){
            $(this).val("unlimited")
            $(this).select();
        }else
            $(this).val(parsed_value)
    });
}

function set_non_negative_integer_field(element_id){
    var element = $("#"+element_id);
    element.keyup(function(){
        var parsed_value = parseInt($(this).val(), 10)
        $(this).val( isNaN(parsed_value) ? 0 : parsed_value)
    });
}

function parse_non_negative_integer(value){
    var parsed_value = parseInt(value, 10)
    return isNaN(parsed_value) ? 0 : parsed_value
}
function parse_unlimited_non_negative_integer(value){
    var parsed_value = parseInt(value, 10)
    return isNaN(parsed_value) ? "unlimited" : parsed_value
}