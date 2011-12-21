class CreateDeliveries < ActiveRecord::Migration
   def self.up
    create_table :deliveries do |t|
      t.column :message_id, :string  
      t.column :recipient, :string
      t.column :content, :text
      t.column :status, :string
    end
  end

  def self.down                
    drop_table :deliveries
  end

end
