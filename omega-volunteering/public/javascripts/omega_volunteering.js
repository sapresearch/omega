/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Aug 20, 2010
 * Time: 3:23:38 PM
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $('#positions_list').find('li').hover(function(){
        $(this).find('.position').addClass('position_hover');
        $(this).find('.actions').css('opacity', 0.9).show();
    },function(){
        $(this).find('.actions').hide();
        $(this).find('.position').removeClass('position_hover');
    })
});