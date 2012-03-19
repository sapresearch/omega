class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.belongs_to :user
      t.string :name

      t.timestamps
    end
    add_index :accounts, :user_id
  end
end
