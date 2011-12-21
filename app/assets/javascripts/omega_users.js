$(function() {

    /* jqueryui autocomplete for users */
    $('#sidebar-search-input').autocomplete({
        source : '/users/autocomplete',
        minLength: 2,
        select: function(event, ui) {

            window.location = '/users/' + ui.item.id;
            return false;
        }
    }).focus(function() {
        $(this).val('')
    });
})