class CreateContacts < ActiveRecord::Migration
  def self.up
    create_table :contacts do |t|
      t.references :user,       :null => true
      t.string     :email
      t.string     :title
      t.string     :first_name
      t.string     :last_name

      t.boolean :do_not_email
      t.boolean :do_not_phone
      t.boolean :do_not_mail
      t.boolean :do_not_sms
      t.boolean :no_bulk_emails

      t.string :nick_name
      t.string :legal_name
      t.string :middle_name

      t.string :preferred_communication_method
      t.string :preferred_language

      t.date :date_of_birth
      t.date :deceased_date

      t.string :gender

      t.string :individual_suffix

      t.string :status
      
      t.timestamps
    end
  end

  def self.down
    drop_table :contacts
  end
end
