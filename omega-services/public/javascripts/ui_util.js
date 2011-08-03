//delete an element with visual effect
function delete_element(element_id)
{
    $("#"+element_id).hide("slow", function(){ $(this).remove(); })
}


