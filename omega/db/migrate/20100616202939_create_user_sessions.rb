class CreateUserSessions < ActiveRecord::Migration
  def self.up
    create_table :user_sessions do |t|
      t.references :user,             :null => false
      t.boolean    :enabled,          :null => false, :default => true
      t.datetime   :signed_in_at
      t.string     :last_activity
      t.datetime   :last_activity_at
    end
    add_index :user_sessions, :user_id
  end

  def self.down
    drop_table :user_sessions
  end
end
