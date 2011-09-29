$.fn.extend({   
    disabled_copy: function(){
        var first_class_name = $(this).first_class_name();
        var elements = $("."+first_class_name+".ui-state-disabled");
        return elements.length==0 ? null : $(elements[0])
    },
    identical_hidden_copy: function(){
        var first_class_name = $(this).first_class_name();
        var elements = $("."+first_class_name+":hidden:not(.ui-state-disabled)");
        return elements.length==0 ? null : $(elements[0])
    },
    object_id: function(){
        var first_class_name = $(this).first_class_name();
        var strs = first_class_name.split("_")
        return strs[strs.length-1]
    }
});

$(function(){
    $("#asset_allocation_info").resizable({
        start: function(event, ui) {$("body").addClass("disable_selection")},
        stop: function(event, ui) {$("body").removeClass("disable_selection")},
        handles:"s",
        animate:true,
        ghost:true,
        maxHeight:800
    })    
})
var timer;

function hide_message_box(){
    $("#asset_allocation_info").slideUp()
    $("#hide_message_box_link").hide()
    $("#show_message_box_link").show()
}
function show_message_box(){
    $("#asset_allocation_info").slideDown()
    $("#hide_message_box_link").show()
    $("#show_message_box_link").hide()
}

function reset_instruction(){
    $("#asset_allocation_info #instruction").show()
    $("#asset_allocation_info #view").hide()
}
