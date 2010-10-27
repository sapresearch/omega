$(function() {

//    // animate the steps
//    var list = $('#services-intro').find('li');
//    var i = 0;
//    var end = list.length;
//
//    window.setInterval(function() {
//        highlight_step(i);
//        (i==end) ? i=0 : i++;
//    }, 3000);
//    function highlight_step(i) {
//        var step=i+1;
//        var aclass = 'step-' + step + '-active';
//        var rclass = 'step-' + step;
//        $(list[i]).addClass('active').find('.step-nail').removeClass(rclass).addClass(aclass);
//        window.setTimeout(function() {
//      $(list[i]).removeClass('active').find('.step-nail').removeClass(aclass).addClass(rclass);
//
//    }, 2000);
//    }

    $('.elements-list').delegate('li', 'mouseenter',
                                function() {

                                    $(this).find('div.item-list-actions-wrapper').show()
                                }).delegate('li', 'mouseleave',
                                           function() {
                                               $(this).find('div.item-list-actions-wrapper').hide()
                                           });

    var append;

    $('#ui-elements').find('li')
            .draggable({
                           helper: 'clone',
                           start: function() {

                               var ui_em = $(this).find('span.add-ui-em').attr('ui-data');
                               $('#admin-edit-em').empty();
                               $.ajax({
                                   global:false,
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
                                    $.ajax({
                                        global:false,
                                        url:'/form_builder/dispatch_element_properties/' + ui_em + '?em_id=' + em_id + '&field_category=' + category,
                                        dataType: 'script'
                                    })


                                }).droppable({
                                                 drop: function() {
                                                     var em = $(this).find("li:last");
                                                     if (typeof append !== undefined) {

                                                         em.after(append)
                                                                 .effect('highlight')
                                                     }

                                                     else {
                                                         window.setTimeout(function() {
                                                             em.after(append)
                                                                     .effect('highlight')
                                                         }, 1000)
                                                     }
                                                 }
                                             }).delegate('span.delete-ui-em', 'click', function() {
          $(this).parents('li').hide();
        var em_id =  $(this).parents('li').find('.ui-em-preview').attr('id').replace(/ui-em-/,'');

        $('#fields_' + em_id +'__destroy').val('true');
    });

});

function create_editor(em) {
    var html = 'Please enter value abobe <br><input id="edit-field-value" type="text"> </input>';
    var preview = $('#' + em).find('.field-value-preview');
    var submit_val = $('#' + em).find('.field-value');
    $("#admin-edit-em").empty().append(html).effect('highlight');
    $('#edit-field-value').keyup(function() {
        var v = $(this).val();
        preview.empty().append(v);
        submit_val.val(v)
    })
}
