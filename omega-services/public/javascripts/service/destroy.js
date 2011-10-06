function destroy_service(url){
    $( "#service-delete-dialog-confirm" ).dialog({
        resizable: false,
	height:200,
	modal: true,
	buttons: {
            "Delete": function() {
		$( this ).dialog( "close" );
                $.ajax({
                      url: url,
                      type: "DELETE"
                   }
                )
            },
            Cancel: function() {
            	$( this ).dialog( "close" );
            }
	},
        close: function() {
            $( "#service-delete-dialog-confirm" ).dialog('destroy')
        }
    });
}
