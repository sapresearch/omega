$(function(){
    $('#threads-list').find('span.ui-icon-search ').hover(
                                                         function(){

<<<<<<< HEAD
                                                         $(this).siblings('div.thred-preview').show();
                                                         },
                                                         function(){
                                                             $(this).siblings('div.thred-preview').hide();
=======
                                                         $(this).next('.thred-preview').show();
                                                         },
                                                         function(){
                                                             $(this).next('.thred-preview').hide();
>>>>>>> f230a58... update imports
                                                         })
});