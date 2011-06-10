/**
 * Created by IntelliJ IDEA.
 * User: I823626
 * Date: Aug 20, 2010
 * Time: 3:23:38 PM
 * To change this template use File | Settings | File Templates.
 */

$(function() {
    var $positions_list = document.getElementById('positions_list');
    $('.position', $positions_list).mouseenter(function(e) {

        $(this).addClass("position_hover").siblings("div.position_slider").show().animate({ "top" : "0px"}, "fast");


    });

    $('ul#positions_list').delegate('li', 'mouseleave', function(e) {
        if (!$(e.currentTarget).is('.details'))
            $(this).find('div.position').removeClass('position_hover').siblings('div.position_slider').animate({ 'top' : '22px'});

    });

    $('.remove-favorite').bind('ajax:success',
                              function() {
                                  $.showFlash('Succesfully removed from favorites')
                              }).bind('rails:created', function() {
        $.showFlash('Succesfully added to favorites')
    }

            );
});