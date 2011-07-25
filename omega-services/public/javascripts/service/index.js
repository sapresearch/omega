function switch_my_services(service_id){
    var val = $("#my_services").is(":checked") ? "on" : "off";
    var data = {"my_services_switch":val}
    if(service_id)
        data["service_id"]=service_id

    $.ajax({
        url: services_url,
        type: "GET",
        data: data,
        dataType: 'script',
        cache: false
    })
}
function switch_on_my_services(service_id){
    $("#my_services").attr("checked", "checked")
    switch_my_services(service_id)
}

function switch_off_my_services(service_id){
    $("#my_services").removeAttr("checked")
    switch_my_services(service_id)
}

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
