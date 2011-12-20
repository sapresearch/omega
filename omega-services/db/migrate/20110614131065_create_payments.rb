class CreatePayments < ActiveRecord::Migration
  def self.up
    create_table :payments do |t|
      t.references :payable, :polymorphic => true
      t.references :payer
      t.decimal :amount, :precision => 8, :scale => 2, :default=>0.00
      t.string :payment_method
      t.integer :transaction_id
      t.text :description
      t.string :status
      t.boolean :is_test

      t.timestamps
    end
  end

  def self.down
    drop_table :payments
  end
end
