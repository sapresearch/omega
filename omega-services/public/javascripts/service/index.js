function services_accordion(service_id){
    var service = find_service_by_id(services, service_id)
    var index = jQuery.inArray(service, services)
    if(index<0)
        index = false;
    //var index = services.indexOf(service) // IE incompatible

    $( "#accordion" ).accordion({
         active: index,
         //event: "mouseover",
         //animated: 'bounceslide',
         autoHeight: false,
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
