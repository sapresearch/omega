class CreateGroupsRequesters < ActiveRecord::Migration
  def self.up
    create_table :groups_requesters do |t|
      t.references :group
      t.references :requester
      t.string :status
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_requesters
  end
end
