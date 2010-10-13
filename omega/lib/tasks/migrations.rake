Trams::Tasks.define do
  desc 'Migrate all installed trams. Turn off output with VERBOSE=false.'
  task :migrate => :environment do
    ActiveRecord::Migration.verbose = ENV['VERBOSE'] ? ENV['VERBOSE'] == 'true' : true
    version = ENV['VERSION'] ? ENV['VERSION'].to_i : nil

    Trams::Base.subclasses.each do |tram|
      Omega::Migrations.migrate(tram, version) if Omega::Migrations.can_migrate?(tram)
    end
  end
end

Trams::Tasks.each_tram do |tram, name|
  if Omega::Migrations.can_migrate?(tram)
    desc "Pushes the schema to the next version for the #{name} tram. " +
         'Specify the number of steps with STEP=n'
    task :forward => :environment do
      step = ENV['STEP'] ? ENV['STEP'].to_i : 1
      Trams::Migrations.forward(tram, step)
    end

    desc "Migrate the #{name} tram. " +
         'Target specific version with VERSION=x. Turn off output with VERBOSE=false.'
    task :migrate => :environment do
      ActiveRecord::Migration.verbose = ENV['VERBOSE'] ? ENV['VERBOSE'] == 'true' : true
      Omega::Migrations.migrate(tram, ENV['VERSION'] ? ENV['VERSION'].to_i : nil)
    end

    namespace :migrate do
      desc "Rollbacks the database one migration and re migrate up for the #{name} tram. " +
           'If you want to rollback more than one step, define STEP=x. Target specific version with VERSION=x.'
      task :redo => :environment do
#        if ENV["VERSION"]
#          Rake::Task["#{@namespace}:migrate:down"].invoke
#          Rake::Task["#{@namespace}:migrate:up"].invoke
#        else
#          Rake::Task["#{@namespace}:rollback"].invoke
#          Rake::Task["#{@namespace}:migrate"].invoke
#        end
      end

      desc %Q{Runs the "up" for the #{name} tram for a given migration VERSION.}
      task :up => :environment do
        version = ENV["VERSION"] ? ENV["VERSION"].to_i : nil
        raise "VERSION is required" unless version
        Omega::Migrations.up(tram, version)
      end

      desc %Q{Runs the "down" for the #{name} tram for a given migration VERSION.}
      task :down => :environment do
        version = ENV["VERSION"] ? ENV["VERSION"].to_i : nil
        raise "VERSION is required" unless version
        Omega::Migrations.down(tram, version)
      end
    end

    desc "Revert the migrations from the #{name} tram. Turn off output with VERBOSE=false."
    task :revert => :environment do
      Omega::Migrations.revert(tram)
    end

    desc "Rolls the schema back to the previous version for the #{name} tram. " +
         'Specify the number of steps with STEP=n.'
    task :rollback => :environment do
      step = ENV['STEP'] ? ENV['STEP'].to_i : 1
      Omega::Migrations.rollback(tram, step)
    end
  end
end
