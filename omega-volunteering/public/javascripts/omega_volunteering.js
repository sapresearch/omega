/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Aug 20, 2010
 * Time: 3:23:38 PM
 * To change this template use File | Settings | File Templates.
 */

$(function() {
    var $positions_list = document.getElementById('positions-list');
    $('.position', $positions_list).mouseenter(function(e) {

        $(this).addClass("position-hover").siblings("div.position-slider").show().animate({ "top" : "0px"}, "fast");


    });

    $($positions_list).find('li').mouseleave(function(e) {
        if (!$(e.currentTarget).is('.details'))
            $(this).find('div.position').siblings('div.position-slider').animate({ 'top' : '22px'},100).end().removeClass('position-hover');

    });

    $('.remove-favorite').bind('ajax:success',
                              function() {
                                  $.showFlash('Succesfully removed from favorites')
                              }).bind('rails:created', function() {
        $.showFlash('Succesfully added to favorites')
    }

            );

    var $records_list = document.getElementById('records-list');
    $($records_list).delegate('li.list-item','mouseenter',function(){
            $(this).find('div.item-list-actions-wrapper').fadeIn()

    });
    $($records_list).delegate('li.list-item','mouseleave',function(){
            $(this).find('div.item-list-actions-wrapper').fadeOut()

    });



});