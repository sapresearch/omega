class CreateCustomizations < ActiveRecord::Migration
  def change
    create_table :customizations do |t|

      t.references :account, :null=>false
      t.string :name
      t.string :homepage_headline
      t.text :homepage_description

      t.string :logo_file_name
      t.string :logo_content_type
      t.integer :logo_file_size

      t.string :homepage_picture_file_name
      t.string :homepage_picture_content_type
      t.integer :homepage_picture_file_size

      t.timestamps
    end
  end
end

