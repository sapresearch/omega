module GroupLib

  def groups_to_search
    groups = has_permission?(Group::PERM_ADMIN) ? Group.all : Group.real_public_groups
    groups.sort!{|g1,g2|g1.name<=>g2.name}
    groups.map{|g|{:label=>g.name, :value=>g.name, :id=>g.id}}
  end
  
end