function new_group(dialog_html){
    $(dialog_html).dialog({
        width: 620,
        modal: true,
        resizable: false,
        buttons: {
            "Create": function() {
                $("#new_group").submit();
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
            $(this).remove();
        }
    })
    set_unlimited_non_negative_integer_field("group_capacity");
}