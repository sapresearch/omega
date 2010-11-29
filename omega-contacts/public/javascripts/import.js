$(function() {

    $('#import_filter_By_Mapping').click(function() {
        import_data(this.id)
    });

    $('#import_filter_By_Data').click(function() {
        import_data(this.id)
    });

});

function import_data(selection){

    var import_date = document.getElementById('import_date').value;

    $.ajax({

                type: "GET",
                url: "/contacts/imports/get_import_data",
                data: { "created_at": import_date, "filter": selection },
                success: function(html){

                    $('#import_contacts').html(html);
                }
    });
}