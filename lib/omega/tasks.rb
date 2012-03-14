module Omega
  module Tasks
    class << self
      def define
        namespace :omega do
          namespace :all do
            yield
          end
        end
      end

      def each_module
        Omega::Module::Base.subclasses.each do |mod|
          name = mod.undecorated_name.gsub(/::/, ' ').titleize
          ns   = mod.undecorated_name.gsub(/::/, ':').underscore

          namespace(ns) do
            yield(mod, name, ns)
          end
        end
      end
    end
  end
end