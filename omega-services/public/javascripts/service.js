$(document).ready(function() {

   var session = document.getElementById('step1_choice_').value;

   if (session == "service_type_Select_From_Existing_Types"){

       $('#service_with_type').show();
       $('#service_without_type').hide();
       $('#list').show();
   }

   else if(session == "service_type_New_Enrollable_Type"){

       service_category("service_type_New_Enrollable_Type")
   }

   else if(session == "service_type_New_Requestable_Type"){

       service_category("service_type_New_Requestable_Type")
   }

   else{

    $('#service_with_type').show();
    $('#list').show();

   }

    $('#service_type_Select_From_Existing_Types').click(function() {

       $('#service_without_type').hide();
       $('#service_with_type').show();
       $('#list').show();

      });

    $('#service_type_New_Enrollable_Type').click(function() {

        service_category(this.id);
    });

    $('#service_type_New_Requestable_Type').click(function() {

        service_category(this.id);
    });

});

function service_category(value){


       $.ajax({

                type: "GET",

                url: "/services/define_service_type",

                data: "service_category="+value,

                success: function(html){

                $('#service_with_type').hide();
                $('#list').hide();
                $('#service_without_type').show();
                $("#service_without_type").html(html);
                 }

       });


}

function service_types(service_type) {

         $.ajax({

           type: "GET",
           url: "/services/retrieve_existing_type",

           data: "service_type="+service_type,

           success: function(html){

         $("#fields_list").html(html);
          }

        });

}

function clicked(choice) {


    $.ajax({

           type: "GET",
           url: "/services/set_session",

           data: "choice="+choice,

           success: function(html){

          }

        });

}

