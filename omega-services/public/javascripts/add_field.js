$(document).ready(function() {

    $('#service_fields').show();
    $('#registration_fields').hide();


    $('#service_service_field_add_a_service_detail').click(function() {

       $('#registration_fields').hide();
       $('#service_fields').show();

      });


    $('#service_service_field_add_a_registration_detail').click(function() {

       $('#service_fields').hide();
       $('#registration_fields').show();

    });

});






