$.fn.extend({
    checkbox_to_button: function(){
        var label = $(this).is(":checked") ? "Yes" : "No"
        $(this).button({label:label});
        if(label=="Yes")
          $(this).parent().addClass("on")
        else
          $(this).parent().removeClass("on")
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
