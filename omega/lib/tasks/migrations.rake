Omega::Tasks.define do
  desc 'Migrate all installed modules. Turn off output with VERBOSE=false.'
  task :migrate => :environment do
    ActiveRecord::Migration.verbose = ENV['VERBOSE'] ? ENV['VERBOSE'] == 'true' : true
    version = ENV['VERSION'] ? ENV['VERSION'].to_i : nil

    Omega::Module::Base.subclasses.each do |mod|
      Omega::Migrations.migrate(mod, version) if Omega::Migrations.can_migrate?(mod)
    end
  end
end

Omega::Tasks.each_module do |mod, name, ns|
  if Omega::Migrations.can_migrate?(mod)
    desc "Pushes the schema to the next version for the #{name} module. " +
         'Specify the number of steps with STEP=n'
    task :forward => :environment do
      step = ENV['STEP'] ? ENV['STEP'].to_i : 1
      Trams::Migrations.forward(mod, step)
    end

    desc "Migrate the #{name} module. " +
         'Target specific version with VERSION=x. Turn off output with VERBOSE=false.'
    task :migrate => :environment do
      ActiveRecord::Migration.verbose = ENV['VERBOSE'] ? ENV['VERBOSE'] == 'true' : true
      Omega::Migrations.migrate(mod, ENV['VERSION'] ? ENV['VERSION'].to_i : nil)
    end

    namespace :migrate do
      desc "Rollbacks the database one migration and re migrate up for the #{name} module. " +
           'If you want to rollback more than one step, define STEP=x. Target specific version with VERSION=x.'
      task :redo => :environment do
        if ENV["VERSION"]
          Rake::Task["#{ns}:migrate:down"].invoke
          Rake::Task["#{ns}:migrate:up"].invoke
        else
          Rake::Task["#{ns}:rollback"].invoke
          Rake::Task["#{ns}:migrate"].invoke
        end
      end

      desc %Q{Runs the "up" for the #{name} module for a given migration VERSION.}
      task :up => :environment do
        version = ENV["VERSION"] ? ENV["VERSION"].to_i : nil
        raise "VERSION is required" unless version
        Omega::Migrations.up(mod, version)
      end

      desc %Q{Runs the "down" for the #{name} module for a given migration VERSION.}
      task :down => :environment do
        version = ENV["VERSION"] ? ENV["VERSION"].to_i : nil
        raise "VERSION is required" unless version
        Omega::Migrations.down(mod, version)
      end
    end

    desc "Revert the migrations from the #{name} module. Turn off output with VERBOSE=false."
    task :revert => :environment do
      Omega::Migrations.revert(mod)
    end

    desc "Rolls the schema back to the previous version for the #{name} module. " +
         'Specify the number of steps with STEP=n.'
    task :rollback => :environment do
      step = ENV['STEP'] ? ENV['STEP'].to_i : 1
      Omega::Migrations.rollback(mod, step)
    end
  end
end
