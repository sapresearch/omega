/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Aug 20, 2010
 * Time: 3:23:38 PM
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    $('#positions_list').find('li').hover(function() {
        $(this).find('.position_actions').show()
        $(this).find('.position').addClass('position_hover');
        $(this).find('.posDescribtion').hide();
        $(this).find('.position_details').show();
    }, function() {
        $(this).find('.position_actions').hide()
        $(this).find('.position_details').hide();
        $(this).find('.posDescribtion').show();
        $(this).find('.position').removeClass('position_hover');
    });
    $('.nav_em_show').hover(function() {
        $(this).addClass('nav_em_show_hover');
    }, function() {
        $(this).removeClass('nav_em_show_hover');
    }
            )
});