$(document).ready(function() {

    $('#service_with_type').show();
    $('#list').show();

    $('#service_service_type_select_from_existing_types').click(function() {

       $('#service_without_type').hide();
       $('#service_with_type').show();
       $('#list').show();

      });


    $('#service_service_type_new_enrollable_type').click(function() {


       $.ajax({

                type: "GET",

                url: "/services/define_service_type",

                data: "service_category="+this.value,
           
                success: function(html){

                $('#service_with_type').hide();
                $('#list').hide();
                $('#service_without_type').show();
                $("#service_without_type").html(html);
                 }
            });

      });

    $('#service_service_type_new_requestable_type').click(function() {


       $.ajax({

                type: "GET",

                url: "/services/define_service_type",
           
                data: "service_category="+this.value,

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
           url: "/services/retrieve_existing_type",

           data: "service_type="+service_type,

           success: function(html){

         $("#fields_list").html(html);
          }
        });

}






