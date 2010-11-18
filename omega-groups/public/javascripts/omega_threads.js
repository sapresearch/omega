$(function(){
    $('#threads-list').find('span.ui-icon-search ').hover(
                                                         function(){
                                                         $(this).siblings('div.thred-preview').show();
                                                         },
                                                         function(){
                                                             $(this).siblings('div.thred-preview').hide();
                                                         $(this).next('.thred-preview').show();
                                                         },
                                                         function(){
                                                             $(this).next('.thred-preview').hide();
                                                         })
});