class CreateSettings < ActiveRecord::Migration
  def self.up
		create_table :settings do |t|
			t.string :facebook_token
			t.boolean :twitter
			t.integer :user_id

			t.timestamps
		end
		add_index :settings, :user_id
  end

  def self.down
		drop_table :settings
  end
end
