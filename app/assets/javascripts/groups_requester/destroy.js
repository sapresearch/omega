function destroy_group_request(dialog_html, url){
    $( dialog_html ).dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Withdraw": function() {
                $( this ).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "DELETE"
                })
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
        }
    });
}