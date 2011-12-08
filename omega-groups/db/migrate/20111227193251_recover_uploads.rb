class RecoverUploads < ActiveRecord::Migration
  def self.up
    change_table :uploads do |t|
      t.rename :file_name, :upload_file_name
      t.rename :file_size, :upload_file_size
      t.rename :file_type, :upload_content_type
    end
  end

  def self.down
    change_table :uploads do |t|
      t.rename :upload_file_name, :file_name
      t.rename :upload_file_size, :file_size
      t.rename :upload_content_type, :file_type
    end
  end
end
