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

function clear_visual_effects(){
    $(".connectedSortable").removeClass("connectedSortable")
    $(".active").removeClass("active")
    $(".assets_list .main_list_item").stop(true,true).stopTime().css("background-color","lightblue");
    $(".leaf_services_list .main_list_item").stop(true,true).stopTime().css("background-color","green");
    $(".main_list_item").removeClass("main_list_item")
    $(".list_fieldset").droppable("destroy")
    $(".assets_list").sortable("option","connectWith", false)
    $(".assets_list li.ui-state-disabled").hide()
    $(".assets_list li:not(.ui-state-disabled)").show()
    $(".leaf_services_list li.ui-state-disabled").hide()
    $(".leaf_services_list li:not(.ui-state-disabled)").show()
    $(".exchange").css("visibility","hidden")
    $(".tipsy").remove();
}

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

function display_static_view(){
    $("#asset_allocation_info #instruction").hide()
    $("#asset_allocation_info #dynamic_view").hide()
    $("#asset_allocation_info #static_view").show()
}
function display_dynamic_view(){
    $("#asset_allocation_info #instruction").hide()
    $("#asset_allocation_info #static_view").hide()
    $("#asset_allocation_info #dynamic_view").show()
}
function display_instruction(){
    $("#asset_allocation_info #dynamic_view").hide()
    $("#asset_allocation_info #static_view").hide()
    $("#asset_allocation_info #instruction").show()
}
