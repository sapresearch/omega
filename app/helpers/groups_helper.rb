module GroupsHelper

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "group_lib.rb"
  include GroupLib

  def group_bread_crumb(group)
    while not group.nil?
      html = " > ".html_safe + (link_to group.name, groups_url(:super_group_id=>group.id), :remote=>true) + html
      group = group.super_group
    end
    html = (link_to "All groups", groups_url(:super_group_id=>Group::ROOT_SUPER_GROUP_ID), :remote=>true) + html;
    html = "<div class='bread_crumb'>".html_safe + "Location: " + html
    html += "</div>".html_safe
  end    

end

