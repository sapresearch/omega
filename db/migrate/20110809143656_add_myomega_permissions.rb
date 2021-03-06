class AddMyomegaPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  PERMISSIONS = {
		'myomega_admin' => {},
		'myomega_view' => {}
  }

  def self.up
    say_with_time "add_permissions" do
      PERMISSIONS.each do |value, attr|
        Permission.create!(attr.reverse_merge(:name => value.titleize).merge(:value => value))
      end
    end
  end

  def self.down
    say_with_time "remove_permissions" do
      Permission.where('value IN (?)', PERMISSIONS.keys).destroy_all
    end
  end
end
