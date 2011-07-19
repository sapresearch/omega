function update_service_status(url){
    $( "#service-update-status-dialog-confirm" ).dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Yes": function() {
                $( this ).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "PUT",
                    data: ({recursive:true})
                })
            },
            "No": function() {
                $( this ).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "PUT",
                    data: ({recursive:false})
                })
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#service-update-status-dialog-confirm" ).dialog('destroy')
        }
    });
}


