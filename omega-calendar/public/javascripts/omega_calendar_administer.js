$(function(){
    $('#calendars-list').find('li').mouseenter(
                             function() {
                                 $(this).find('div.item-list-actions-wrapper').fadeIn()
                             }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').fadeOut()
    });
});