function destroy_topic(dialog_html, url){
    $(dialog_html).dialog({
        resizable: false,
	height:200,
        width:350,
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
            $(this).dialog('destroy')
        }
    });
}