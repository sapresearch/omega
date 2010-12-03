$(function() {

    $('#import_filter_By_Mapping').click(function() {
        import_data(this.id)
    });

    $('#import_filter_By_Data').click(function() {
        import_data(this.id)
    });
    

    $('#wizard-intro li').hover(function(){
      
        $(this).find('.wizard-explanation').show().animate({
marginTop: '-110px', /* The next 4 lines will vertically align this image */
                             marginLeft: '-110px',
                             top: '50%',
                             left: '50%',
                             width: '200px', /* Set new width */
                             height: '200px' /* Set new height */

                         }, 200)
    },function(){
        
        $(this).find('.wizard-explanation').animate({
 marginTop: '0', /* Set alignment back to default */
                             marginLeft: '0',
                             top: '0',
                             left: '0',
                             width: '200px', /* Set width back to default */
                             height: '0px' /* Set height back to default */
                             
                         },200, function(){
            
        $(this).hide()
        })



    })

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