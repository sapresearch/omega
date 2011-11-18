function new_asset(){
    $( "#asset-new-dialog-form" ).dialog({
        width: 620,
        modal: true,
        resizable: false,
        buttons: {
            "Create": function() {
                create_asset()
                $(this).dialog( "close" );
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
        }
    });
}

function create_asset(){
    $("#new_asset").submit()
}

function edit_asset(dialog_content){
    $( "#asset-edit-dialog-form" ).html(dialog_content)
    $( "#asset-edit-dialog-form" ).dialog({
        width: 620,
        modal: true,
        resizable: false,
        buttons: {
            "Update": function() {
                update_asset()
                $(this).dialog( "close" );
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
        }
    });
}
function update_asset(){
    $(".edit_asset").submit()
}

function destroy_asset(dialog_html, url){
    $(dialog_html).dialog({
        resizable: false,
        minWidth:420,
	height:190,
	modal: true,
	buttons: {
            "Delete": function() {
		$( this ).dialog( "close" );
                $.ajax({
                    url:url,
                    type:"DELETE"
                })
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

