$(function() {

    /**
     * show actions on hover
     */
    $('.elements-list').delegate('li', 'mouseenter',
                                function() {

                                    $(this).find('div.item-list-actions-wrapper').show()
                                }).delegate('li', 'mouseleave',
                                           function() {
                                               $(this).find('div.item-list-actions-wrapper').hide()
                                           });
//@append stores the html for the new ui element which gets added with the droppable event
    var append;
    /**
     * add drag event listener to the different ui elements in the right menu.
     */
    $('#ui-elements').find('li')
            .draggable({
                           helper: 'clone',
                           start: function() {
// as soon as we start dragging we know which ui element the user want to add/ @ui-em
                               var ui_em = $(this).find('span.add-ui-em').attr('ui-data');
                               $('#admin-edit-em').empty();
                               // retrieve the html for the new ui element and append it to the list
                               $.ajax({

                                   url:'/form_builder/dispatch_ui_element/' + ui_em ,
                                   success:function(data) {
                                       append = data;

                                   }
                               })

                           }
                       });

    $('.elements-list').delegate('span.edit-ui-em', 'click',
                                function() {
                                    var category = $(this).parents('.elements-list').attr('id');
                                    var em_preview = $(this).parents('li').find('.ui-em-preview');
                                    var ui_em = em_preview.attr('ui-data');
                                    var em_id = em_preview.attr('id');
                                    // listen for click event to determine which ui element gets edited.
                                    // invoke dispatch_element_properties with right element. ui-em.js.erb gets rendered which inserts the html and js for
                                    // editing the element

                                    $.ajax({

                                        url:'/form_builder/dispatch_element_properties/' + ui_em + '?em_id=' + em_id + '&field_category=' + category,
                                        dataType: 'script'
                                    })


                                }).droppable({
                                                 drop: function() {

                                                     var em = $(this).find("li:last");
                                                     // check if the ajax is already done and the append html present
                                                     // otherwise wait and try it again

                                                     if (typeof append !== undefined) {

                                                         em.after(append)
                                                                 .effect('highlight')
                                                     }

                                                     else {
                                                         window.setTimeout(function() {
                                                             em.after(append).effect('highlight')
                                                         }, 1000)
                                                     }
                                                 }
                                             }).delegate('span.delete-ui-em', 'click', function() {
        $(this).parents('li').hide();
        //mark element for delete with the submission of the form
        var em_id = $(this).parents('li').find('.ui-em-preview').attr('id').replace(/ui-em-/, '');
        $('#fields_' + em_id + '__destroy').val('true');
    });
});

