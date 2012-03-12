function destroy_service_registration(url, pre_html){
    var data={}
    if(pre_html){
        $( "#service-registration-destroy-dialog-confirm .pre_html" ).html("<p>"+pre_html+"</p>");
        data["type"]="admin";
    }
    
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
                    data: data
                })
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
            $( "#service-registration-destroy-dialog-confirm .pre_html" ).empty();
        }
    });
}