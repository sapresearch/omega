class CreateMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.references :to
      t.references :from
      t.string     :subject
      t.text       :body
      t.datetime   :read_at
      t.datetime   :deleted_by_to_at
      t.datetime   :deleted_by_from_at
      t.timestamps
    end
  end

  def self.down
    drop_table :messages
  end
end
