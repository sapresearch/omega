class RolesController < Omega::Controller
  respond_to :html, :xml, :js, :json
  breadcrumb 'Roles' => :roles
  
  def index
    #@roles = Role.all
    @permissions = Permission.all
    @page = params[:page]||1
    @roles = Role.paginate(:page => @page, :per_page => 4)
    @role = Role.new

    respond_with(@roles)
  end

  def create
    #@role = Role.create(params[:role])
    @name = params[:role][:name]
    @description = params[:role][:description]
    @internal_name = @name.downcase.gsub(" ","_")
    @role = Role.create(:name=>@name,:description=>@description, :internal_name=>@internal_name)
    
    @page = (Role.all.count / 4.0).ceil

    respond_with(@role) do |format|
      format.js {redirect_to roles_url(:page=>@page)}
    end
  end

  def restore_role_permission_associations
    Role.transaction do
      Permission.transaction do
        
        Role.destroy_all
        Permission.destroy_all
        
        Role::DEFAULT_ROLES.each_with_index do |(internal_name, attr), index|
          role = Role.new(attr.reverse_merge(:name => internal_name.titleize).merge(:internal_name => internal_name))
          role.id = index+1
          role.save
        end

        Permission::DEFAULT_PERMISSIONS.each_with_index do |(value, attr), index|
          permission = Permission.new(attr.reverse_merge(:name => value.titleize).merge(:value => value))
          permission.id = index+1
          permission.save!
        end

        Role::DEFAULT_ASSIGNMENTS.each do |role, permissions|
          role = Role.find_by_internal_name(role)
          role.permissions << Permission.where('value IN (?)', permissions)
          role.save!
        end

        User.all.each do |u|
          role = Role.find_by_internal_name("authenticated_user")
          u.roles << role
          u.save!
        end
        
        user = User.find_by_username("admin")
        if user.nil?
          user = User.new do |u|
            u.username = 'admin'
            u.password_salt = 128.times.inject('') { |salt,| salt << rand(93) + 33 }
            u.password_hash = Digest::SHA512.hexdigest('admin' + u.password_salt)            
          end
        end
        user.roles << Role.find_by_internal_name('administrator')
        user.save(:validate=>false)

      end
    end

    @roles = Role.all
    @permissions = Permission.all
    respond_with(@roles)
  end

  def update_permission
    @role = Role.find(params[:id])
    @permission = Permission.find(params[:permission_id])
    @permission_switch = params[:switch]
    @permission_switch == "on" ? @role.permissions << @permission : @role.permissions.delete(@permission)
    @role.save!

    respond_with(@role)
  end
 
end

