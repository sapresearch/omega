Trams::Tasks.define do
  namespace :assets do
    desc "Delete all assets from installed trams."
    task :delete => :environment do
      Assets.delete
    end

    desc 'Refresh all assets from installed trams'
    task :refresh => :environment do
      Assets.refresh
    end

    desc 'Override all changes made to assets from trams'
    task :refresh! => :environment do
      Assets.refresh!
    end
  end
end

Trams::Tasks.each_tram do |tram, name|
  if ::Assets.has_assets?(tram)
    namespace :assets do
      desc "Delete all assets from the #{name} tram."
      task :delete => :environment do
        Assets.delete(tram)
      end

      desc "Refresh all assets from the #{name} tram."
      task :refresh => :environment do
        Assets.refresh(tram)
      end

      desc "Override all changes made to the assets from the #{name} tram."
      task :refresh! => :environment do
        Assets.refresh!(tram)
      end
    end
  end
end
