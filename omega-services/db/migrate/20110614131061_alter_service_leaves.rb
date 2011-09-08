class AlterServiceLeaves < ActiveRecord::Migration
  def self.up
    rename_column :service_leaves, :type, :register_type
    ServiceLeaf.all.each{|sl|sl.update_attribute(:register_type, "enrollable") if sl.register_type.nil?} # fill the empty fields.
  end

  def self.down
    rename_column :service_leaves, :register_type, :type
  end
end
