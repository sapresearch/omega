class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.references :user,       :null => true
      t.string     :title
      t.string     :first_name
      t.string     :last_name
      t.string     :middle_name

      t.string     :email
      t.string     :email2

      t.string     :emergency_contact_name
      t.integer    :emergency_contact_number

      t.boolean    :volunteered_before
      t.text       :volunteerd_when_where
     
      t.string     :parent_name
      t.string     :parent_email
      t.boolean    :do_not_email
      t.boolean    :no_bulk_emails


      t.string :gender
      t.string :about_us

      t.string :status
      
      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
