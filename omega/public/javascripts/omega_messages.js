/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: 10/6/10
 * Time: 1:03 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){

    var $list = document.getElementById('messages-list');
    $('li', $list).mouseenter(
                                     function() {

                                         $(this).find('div.item-list-actions-wrapper').fadeIn()
                                     }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').fadeOut()
    });
});
