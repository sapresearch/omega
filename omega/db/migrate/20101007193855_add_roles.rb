class AddRoles < ActiveRecord::Migration
  ROLES = {
    'anonymous' => {
      :name        => 'Anonymous',
      :description => '',
      :locked      => true
    },
    'authenticated_user' => {
      :name        => 'Authenticated User',
      :description => '',
      :locked      => true
    },
    'editor' => {
      :name        => 'Editor',
      :description => ''
    },
    'administrator' => {
      :name        => 'Administrator',
      :description => ''
    }
  }
  def self.up
    say_with_time "add_roles" do
      ROLES.each do |internal_name, attr|
        Role.create(attr.reverse_merge(:name => internal_name.titleize).merge(:internal_name => internal_name))
      end
    end
  end

  def self.down
    say_with_time "remove_roles" do
      Role.where('internal_name IN (?)', ROLES.keys).destroy_all
    end
  end
end
