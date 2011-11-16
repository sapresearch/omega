function new_group_request(dialog_html){
    $(dialog_html).dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Join": function() {
                $("#new_groups_requester").submit();
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
}
