function new_customization(url){
    $('#select_customizations_field').invisible();
    $.ajax({
        url: url,
        dataType: 'script',
        cache: false
    });
}

function edit_customization(){
    var option = $('#select_customizations option:selected')
    var edit_url = option.data('edit_url');
    if(edit_url){
        $.ajax({
            url: edit_url,
            dataType: 'script',
            cache: false
        });
    }else{
        dialog_message("no-customization", "No Customization Found", "<p>No existing customization is found.</p>", {width:500})
    }
}

function delete_customization(dialog_html, url){
    $(dialog_html).dialog({
        resizable: false,
	height:200,
        width:350,
	modal: true,
	buttons: {
            "Delete": function() {
		$( this ).dialog( "close" );
                $.ajax({
                      url: url,
                      type: "DELETE"
                   }
                )
            },
            Cancel: function() {
            	$( this ).dialog( "close" );
            }
	},
        close: function() {
            $(this).dialog('destroy')
        }
    });
}

function existing_customizations(){
    $('#select_customizations_field').visible();
    edit_customization();
}