class DropEvergreenColumnsFromContacts < ActiveRecord::Migration
	COLUMNS = [:evergreen_news, :evergreen_bw_news, :gta_volunteer_news, :vancouver_volunteer_news, :outdoor_classroom, :la_classe_en_plein_air, :evergreen_funding_opp, :evergreen_bw_school_program, :evergreen_bw_family_program]

  def up
		COLUMNS.each do |c|
			remove_column :contacts, c if column_exists?(:contacts, c)
		end
	end

	def down
		COLUMNS.each do |c|
			add_column :contacts, c, :boolean
		end
	end

end
