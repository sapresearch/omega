function destroy_service_registration(url){
    $( "#service-registration-destroy-dialog-confirm" ).dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Unregister": function() {                
                $( this ).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "DELETE",
                    success: function(msg){
                        $( "#service-registration-destroyed-dialog-message" ).dialog({
                            resizable: false,
                            modal: true,
                            buttons: {
                                Ok: function() {
                                    $( this ).dialog( "close" );
                                }
                            },
                            close: function() {
                                $( "#service-registration-destroyed-dialog-message" ).dialog('destroy')
                            }
                        });
                    }
                })
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#service-registration-destroy-dialog-confirm" ).dialog('destroy')
        }
    });
}