$.fn.extend({
    checkbox_to_button: function(){
        var label = $(this).is(":checked") ? "Yes" : "No"
        $(this).button({label:label});
        if(label=="Yes")
          $(this).parent().addClass("on")
        else
          $(this).parent().removeClass("on")
    }
});

