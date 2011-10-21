$.fn.extend({
    checkbox_to_button: function(){
        var label = $(this).is(":checked") ? "Yes" : "No"
        $(this).button({label:label});
        if(label=="Yes")
          $(this).parent().addClass("on")
        else
          $(this).parent().removeClass("on")
    },
    column_name: function(){
        var td_element = $(this).parents("td")
        var index = $(this).parents("tr").children("td").index(td_element);
        return $($(td_element.parents("table").find("tr")[0]).children("td")[index]).text().trim()
    },
    row_name:function(){
        return $($(this).parents("tr").children("td")[0]).text().trim()
    }
});

function find_role_by_id(roles, id){
  if(isNaN(id)) return null;
  for(var i=0; i<roles.length; i++){
    if(roles[i].role.id == id)
      return roles[i];
  }
  return null;
}

function find_permission_by_id(permissions, id){
  if(isNaN(id)) return null;
  for(var i=0; i<permissions.length; i++){
    if(permissions[i].permission.id == id)
      return permissions[i];
  }
  return null;
}


function new_role(){
    $( "#role-new-dialog-form" ).dialog({
        width: 500,
        modal: true,
        resizable: false,
        buttons: {
            "Create": function() {
                create_role()
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

function create_role(){
    $("#new_role").submit()
}
