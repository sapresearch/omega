class ClearServices < ActiveRecord::Migration
  TABLES = %w{service_category_fields service_field_values service_fields
              service_fieldvalues service_registrations service_type_field_values
              service_type_fields service_type_template_field_values
              service_type_template_fields service_type_templates service_types
              services}
  def self.up
    TABLES.each do |table|
      drop_table table if table_exists?(table)
    end
  end

  def self.down
    TABLES.each do |table|
      create_table table unless table_exists?(table)
    end
  end
end
