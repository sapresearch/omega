$(function(){
    $('#threads-list').find('span.ui-icon-search ').hover(
                                                         function(){

                                                         $(this).next('.thred-preview').show();
                                                         },
                                                         function(){
                                                             $(this).next('.thred-preview').hide();
                                                         })
});