function split( val ) {
			return val.split( /,\s*/ );
		}
function extractLast( term ) {
			return split( term ).pop();
		}
$(function() {
    var $ac_contacts = $('#ac');
    $ac_contacts.autocomplete({

        source: function(request, response) {
            $.getJSON("/users/autocomplete", {
                term: extractLast(request.term)
            }, response);
        },
        minLength: 3,

        change: function(event, ui) {
            //this.value = ui.item.label
        },
        select: function(event, ui) {
            this.value = ui.item.label;

            $('#message_to_id').val(ui.item.id)
            return false;
        }
    })
});