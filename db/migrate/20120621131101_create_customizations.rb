class CreateCustomizations < ActiveRecord::Migration
  def change
    create_table :customizations do |t|

      t.references :account, :null=>false
      t.string :name
      t.string :homepage_headline
      t.text :homepage_description

      t.timestamps
    end
  end
end

