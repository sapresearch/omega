module Omega
  module Tasks
    class << self
      def define
        namespace :omega do
          yield
        end
      end

      def each_module
        Omega::Module::Base.subclasses.each do |mod|
          name = mod.undecorated_name.gsub(/::/, ' ').titleize

          namespace mod.undecorated_name.gsub(/::/, ':').underscore do
            yield(mod, name)
          end
        end
      end
    end
  end
end