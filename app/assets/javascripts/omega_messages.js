/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: 10/6/10
 * Time: 1:03 PM
 * To change this template use File | Settings | File Templates.
 */

$(function() {
    /* jqueryui autocomplete for users */
    $('#ac-users').autocomplete({
        source : '/users/autocomplete',
        minLength: 2,

        select: function(event, ui) {

            $('#message_to_id').val(ui.item.id)
        },
        change: function(event, ui) {
            $('#ac-users').val(ui.item.label)
        }

    });
    
    $('#messages-list').find('li').mouseenter(
                             function() {
                                 $(this).find('div.item-list-actions-wrapper').show()
                             }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').hide()
    });
});
