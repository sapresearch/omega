function services_accordion(service_id){
    var service = find_service_by_id(services, service_id)
    var index = jQuery.inArray(service, services)
    if(index<0)
        index = false;
    //var index = services.indexOf(service) // IE incompatible

    $( "#accordion" ).accordion({
         active: index,
         clearStyle: true,
         navigation: false,
         collapsible: true
    });
    $(".service_leaf").hover(       
        function(){
            if(!$(this).hasClass("ui-state-active"))
                $(this).removeClass("service_leaf")
        },
        function(){
            $(this).addClass("service_leaf")
        }
    )
}

function delete_service(url){
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
	}
    });
}