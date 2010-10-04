$(document).ready(function() {

    $('#service_with_type').show();
    $('#list').show();

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

function service_type_choice(choice) {


        if (choice == "I'll Choose From the Library") {
            $('#service_without_type').hide();
            $('#service_with_type').show();
            $('#list').show();

        } else if (choice == "I'll Create My Own Type"){

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
        }


}


