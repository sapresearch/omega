function foo(service_type) {

         $.ajax({
           type: "GET",
           url: "/services/get_type_id",

           data: "service_type="+service_type,

           success: function(html){

         $("#fields_list").html(html);
          }
        });

}