function switch_enrollable(){
    var val = $("#enrollable").is(":checked") ? "on" : "off";
    var data = {"enrollable_switch":val}

    $.ajax({
        url: services_url,
        type: "GET",
        data: data,
        dataType: 'script',
        cache: false
    })
}
function switch_requestable(){
    var val = $("#requestable").is(":checked") ? "on" : "off";
    var data = {"requestable_switch":val}

    $.ajax({
        url: services_url,
        type: "GET",
        data: data,
        dataType: 'script',
        cache: false
    })
}
function switch_my_services(){
    var val = $("#my_services").is(":checked") ? "on" : "off";
    var data = {"my_services_switch":val}

    $.ajax({
        url: services_url,
        type: "GET",
        data: data,
        dataType: 'script',
        cache: false
    })
}
function switch_on_my_services(){
    $("#my_services").attr("checked", "checked")
    switch_my_services()
}

function switch_off_my_services(){
    $("#my_services").removeAttr("checked")
    switch_my_services()
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