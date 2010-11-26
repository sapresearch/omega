$(function() {

    $('#import_date').click(function() {


         $.ajax({

                type: "GET",
                url: "/contacts/imports/get_import_data",
                data: "created_at="+this.value,
                success: function(html){
                    $('#imported_contacts').html(html);
                }
       });


    });
});

