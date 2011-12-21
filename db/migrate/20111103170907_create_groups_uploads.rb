class CreateGroupsUploads < ActiveRecord::Migration
  def self.up
    create_table :groups_uploads do |t|
      t.references :group
      t.references :upload
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_uploads
  end
end
