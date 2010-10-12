Trams::Tasks.define do
  namespace :assets do
    desc "Delete all assets from installed trams."
    task :delete => :environment do
      Omega::Assets.delete
    end

    desc 'Refresh all assets from installed trams'
    task :refresh => :environment do
      Omega::Assets.refresh
    end

    desc 'Override all changes made to assets from trams'
    task :refresh! => :environment do
      Omega::Assets.refresh!
    end
  end
end

Trams::Tasks.each_tram do |tram, name|
  if ::Assets.has_assets?(tram)
    namespace :assets do
      desc "Delete all assets from the #{name} tram."
      task :delete => :environment do
        Omega::Assets.delete(tram)
      end

      desc "Refresh all assets from the #{name} tram."
      task :refresh => :environment do
        Omega::Assets.refresh(tram)
      end

      desc "Override all changes made to the assets from the #{name} tram."
      task :refresh! => :environment do
        Omega::Assets.refresh!(tram)
      end
    end
  end
end
