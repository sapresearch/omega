//delete an element with visual effect
function delete_element(element_id)
{
    $("#"+element_id).hide("slow", function(){ $(this).remove(); })
}

function nl2br(str)
{
    return str.replace(/\n/g,'<br/>')
}

function is_empty_html(html){
    return html.match(/\w+/) ? false :true
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