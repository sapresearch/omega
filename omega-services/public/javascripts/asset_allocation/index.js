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


function view_service_allocation(){
    
}
function view_asset_allocation(){
    
}
