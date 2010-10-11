$(document).ready(function() {

    $('#service_with_type').show();
    $('#list').show();

    $('#service_service_type_choose_from_the_library').click(function() {

       $('#service_without_type').hide();
       $('#service_with_type').show();
       $('#list').show();

      });


    $('#service_service_type_create_new_type').click(function() {

       $.ajax({

                type: "GET",

                url: "/services/type_def",

                success: function(html){

                $('#service_with_type').hide();
                $('#list').hide();
                $('#service_without_type').show();
                $("#service_without_type").html(html);
                 }
            });

      });


});

function service_type(service_type) {

         $.ajax({
           type: "GET",
           url: "/services/get_type",

           data: "service_type="+service_type,

           success: function(html){

         $("#fields_list").html(html);
          }
        });

}




