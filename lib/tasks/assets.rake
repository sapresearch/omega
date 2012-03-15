require 'omega/tasks'
require 'omega/assets'
Omega::Tasks.define do
  namespace :assets do
    desc "Delete all assets from installed modules."
    task :delete => :environment do
      Omega::Assets.delete
    end

    desc 'Refresh all assets from installed modules'
    task :refresh => :environment do
      Omega::Assets.refresh
    end

    desc 'Override all changes made to assets from modules'
    task :refresh! => :environment do
      Omega::Assets.refresh!
    end
  end
end

#Omega::Tasks.each_module do |mod, name|
#  if Omega::Assets.has_assets?(mod)
#    namespace :assets do
#      desc "Delete all assets from the #{name} module."
#      task :delete => :environment do
#        Omega::Assets.delete(mod)
#      end
#
#      desc "Refresh all assets from the #{name} module."
#      task :refresh => :environment do
#        Omega::Assets.refresh(mod)
#      end
#
#      desc "Override all changes made to the assets from the #{name} module."
#      task :refresh! => :environment do
#        Omega::Assets.refresh!(mod)
#      end
#    end
#  end
#end
