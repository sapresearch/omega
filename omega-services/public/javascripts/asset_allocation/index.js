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
    },
    maintain_list_integrity: function(){
        var list = $(this)
        $(".ui-state-disabled", list).each(function(){
            var first_class_name = $(this).first_class_name();
            var enabled_items = $("."+first_class_name+":not(ui-state-disabled)", list)
            var count = enabled_items.length
            if(count==0){
                var copy = $(this).clone().enable()
                $(this).is(":visible") ? copy.hide() : copy.show()
                copy.insertBefore(this)
            }else if(count>1){
                for(var i=0;i<count-1;i++)
                    enabled_items[i].remove();
            }
        })
    }
});

