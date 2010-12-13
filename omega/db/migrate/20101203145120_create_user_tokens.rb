class CreateUserTokens < ActiveRecord::Migration
  def self.up
    create_table :user_tokens do |t|
      t.references :user
      t.string     :token
      t.string     :token_type
      t.datetime   :consumed_at
      t.timestamps
    end
  end

  def self.down
    drop_table :user_tokens
  end
end
