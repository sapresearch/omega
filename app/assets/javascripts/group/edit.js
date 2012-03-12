function edit_group(dialog_html){
    $(dialog_html).dialog({
        width: 620,
        modal: true,
        resizable: false,
        buttons: {
            "Update": function() {
                $(".edit_group").submit();
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
            $(this).remove();
        }
    })
    set_unlimited_non_negative_integer_field("group_capacity");
}


function update_group_status(dialog_html, url){
    $(dialog_html).dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        buttons: {
            "Yes": function() {
                $(this).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "PUT",
                    data: ({recursive:true})
                })
            },
            "No": function() {
                $(this).dialog( "close" );
                $.ajax({
                    url: url,
                    type: "PUT",
                    data: ({recursive:false})
                })
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
            $(this).dialog('destroy')
            $(this).remove()
        }
    });
}