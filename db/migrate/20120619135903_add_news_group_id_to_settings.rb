class AddNewsGroupIdToSettings < ActiveRecord::Migration
  def change
    add_column :settings, :news_group_id, :string
  end
end
