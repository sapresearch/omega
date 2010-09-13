$(document).ready(function() {

    var service_type_id = document.getElementById('service_type_id');
    var service_type = document.getElementById('service_service_type');


    service_type_id.onchange = function(){
    service_type.value = service_type_id.value

     };


});
