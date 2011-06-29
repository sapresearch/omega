function services_accordion(){
    $( "#accordion" ).accordion({
         active: false,
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
