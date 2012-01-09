

$(function(){
    var $list = document.getElementById('favorites-list');
    $('#favorites-list').find('li').mouseenter(
                                     function() {
                                         $(this).find('div.item-list-actions-wrapper').show()
                                     }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').hide()
    });
});
