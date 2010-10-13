module Omega
  module Migrations
    class << self
      def can_migrate?(tram)
        File.exists?(tram.root.join('db', 'migrate'))
      end

      def migrate(tram, version = nil)
        set_schema_migrations_table_name_prefix(schema_prefix(tram))
        ActiveRecord::Migrator.migrate(tram.root.join('db', 'migrate'), version)
      end

      def revert(tram)
        set_schema_migrations_table_name_prefix(schema_prefix(tram))
        ActiveRecord::Migrator.migrate(tram.root.join('db', 'migrate'), 0)

        sm_table = ActiveRecord::Migrator.schema_migrations_table_name
        ActiveRecord::Base.connection.drop_table(sm_table)
      end

      def rollback(tram, steps = 1)
        set_schema_migrations_table_name_prefix(schema_prefix(tram))
        ActiveRecord::Migrator.rollback(tram.root.join('db', 'migrate'), steps)
      end

      def forward(tram, steps = 1)
        set_schema_migrations_table_name_prefix(schema_prefix(tram))
        ActiveRecord::Migrator.forward(tram.root.join('db', 'migrate'), steps)
      end

      def up(tram, target_version = nil)
        run(:up, tram, target_version)
      end

      def down(tram, target_version = nil)
        run(:down, tram, target_version)
      end

      def run(direction, tram, target_version = nil)
        set_schema_migrations_table_name_prefix(schema_prefix(tram))
        ActiveRecord::Migrator.run(direction, tram.root.join('db', 'migrate'), target_version)
      end

      private
        def schema_prefix(tram)
          tram.undecorated_name.gsub(/::/, '_').underscore + '_'
        end

        def set_schema_migrations_table_name_prefix(value)
          ActiveRecord::Migrator.class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
            class << self
              def schema_migrations_table_name
                ActiveRecord::Base.table_name_prefix + '#{value}' +
                'schema_migrations' + ActiveRecord::Base.table_name_suffix
              end
            end
          RUBY_EVAL
        end
    end
  end
end
