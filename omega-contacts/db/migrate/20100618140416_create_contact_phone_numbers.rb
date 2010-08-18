class CreateContactPhoneNumbers < ActiveRecord::Migration
  def self.up
    create_table :contact_phone_numbers do |t|
      t.references :contact,        :null => false, :polymorphic => true
      t.string     :number_type
      t.string     :number,         :null => false
      t.string     :available_time
      t.string     :preferred_time
      t.text       :notes
      t.timestamps
    end
  end

  def self.down
    drop_table :contact_phone_numbers
  end
end
