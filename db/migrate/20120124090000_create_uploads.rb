class CreateUploads < ActiveRecord::Migration
  def self.up
    create_table :uploads do |t|
      t.string :name
      t.text :description
      t.string :file_name
      t.integer :file_size
      t.string :file_type

      t.references :binding, :polymorphic => true      
      t.references :uploader
      t.timestamps
    end
  end

  def self.down
    drop_table :uploads
  end
end
