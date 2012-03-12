$(function() {

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

function import_data(selection, import_date){
    $.ajax({

                type: "GET",
                url: "/contacts/imports/get_import_data",
                data: { "created_at": import_date, "filter": selection },
                success: function(html){

                    $('#import_contacts').html(html);
                }
    });
}


function draft_import(date){

    $.ajax({

                type: "GET",
                url: "/contacts/imports/draft_import",
                data: { "created_at": date },
                success: function(html){
                    $('#import_contacts').html(html);

                }
    });
}

function redo_import(date){

    $.ajax({

                type: "GET",
                url: "/contacts/imports/redo_import",
                data: { "created_at": date },
                success: function(html){
                    $('#import_contacts').html(html);

                }
    });
}


