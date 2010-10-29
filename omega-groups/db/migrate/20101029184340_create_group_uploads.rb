class CreateGroupUploads < ActiveRecord::Migration
  def self.up
    create_table :group_uploads do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :group_uploads
  end
end
