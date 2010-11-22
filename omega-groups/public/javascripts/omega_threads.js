$(function(){

    $('#posts-list').dataTable({ "bJQueryUI": true}).find('span.ui-icon-search ').hover(
                                                         function(){
                                                         $(this).siblings('div.post-preview').show();
                                                         },
                                                         function(){
                                                             $(this).siblings('div.post-preview').hide();
                                                         })
});