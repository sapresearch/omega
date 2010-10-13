module Omega
  module Volunteering
    class Module < Omega::Module::Base
      config.omega.volunteering = ActiveSupport::OrderedOptions.new

      initializer :'omega.volunteering.add_favorite_paths' do
        Favorite::Paths['Volunteering::Position'] = :volunteering_position_path
      end
    end
  end
end
