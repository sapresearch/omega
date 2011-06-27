class CreateServiceDetailForms < ActiveRecord::Migration
  def self.up
    create_table :service_detail_forms do |t|

      t.text :html
      t.text :field_values
      t.references :service

      t.timestamps
    end
  end

  def self.down
    drop_table :service_detail_forms
  end
end
