jQuery.fn.jfilter = function(o) {

    return this.each(function() {

        $(this).data('gui-filter', o.list);

        $(this).keyup(function() {
            var filter = $(this).val();
            if (this.value.length < 1) {
                $(this).next('.filter-ctrl').find('.clear-filter').hide();
            } else {
                $(this).next('.filter-ctrl').find('.clear-filter').show().click(function() {
                    $(this).hide();
                    $(o.list).find('li').show();

                });
            }
            $(o.list + ' li').each(function () {
                if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                    $(this).hide();

                } else {
                    $(this).show();
                }
            });
        });
    });
};

$(function() {

    $('#user-list,#member-list,#sidebar-member-list').jScrollPane({showArrows: true});
    $('#contact-assignment').find('div.clear-filter').hide();
    $('#user-filter, #member-filter').focusout(function() {
        $(this).val('');
    });

    $('#user-filter').jfilter({
        list: '#user-list'
    });
    $('#member-filter').jfilter({
        list: '#member-list'
    });


    /* jqueryui autocomplete for groups */
    $('#sidebar-search-input').autocomplete({
        source : '/groups/autocomplete',
        minLength: 3,
        select: function(event, ui) {

            return false;
        }
    }).focus(function() {
        $(this).val('')
    });

    $('#groups-list').find('li').mouseenter(
                                           function() {
                                               $(this).find('div.item-list-actions-wrapper').fadeIn('fast')
                                           }).mouseleave(function() {
        $(this).find('div.item-list-actions-wrapper').fadeOut('fast')
    });
        $('#posts-list').find('span.ui-icon-search ').hover(
                                                         function(){
                                                         $(this).siblings('div.post-preview').show();
                                                         },
                                                         function(){
                                                             $(this).siblings('div.post-preview').hide();
                                                         })



});
