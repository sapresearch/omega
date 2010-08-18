class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.references :user,       :null => true
      t.string     :email
      t.string     :title
      t.string     :first_name
      t.string     :last_name
      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
