class AddAccountIdColumns < ActiveRecord::Migration
	TABLES = ActiveRecord::Base.connection.tables.reject { |t| t == 'omega_hosting_accounts' }

  def self.up
		TABLES.each do |t|
			if not column_exists?( t, :account_id)
    		add_column t, :account_id, :integer
				add_index t, :account_id
			end
		end
  end

  def self.down
		TABLES.each do |t|
			if column_exists?( t, :account_id)
    		remove_column t, :account_id
			end
		end
  end

end
