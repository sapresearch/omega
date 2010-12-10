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
    $('#ui-elements').find('li.ui-em').click(function() {
        var ui_em = $(this).find('span.add-ui-em').attr('ui-data');
        $('#admin-edit-em').empty();
        // retrieve the html for the new ui element and append it to the list
        $.ajax({

            url:'/form_builder/dispatch_ui_element/' + ui_em ,
            success:function(data) {
                var part = '#' + $('#ui-elements').find('input[name="part"]:checked').val() + "-details";

                                                      $(part).append(data);

            }
        })

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


                                }).delegate('span.delete-ui-em', 'click', function() {
        $(this).parents('li').hide();
        //mark element for delete with the submission of the form
        var em_id = $(this).parents('li').find('.ui-em-preview').attr('id').replace(/ui-em-/, '');
        $('#fields_' + em_id + '__destroy').val('true');
    });
});

