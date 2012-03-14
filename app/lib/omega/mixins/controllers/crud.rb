module Omega::Mixins::Controllers
  module Crud
    extend ActiveSupport::Concern

    module ClassMethods
      def crud_helper(model, options = {})
        variable_name = model_name(model)
        finder        = lambda { |m, id| m.find(id) }
        # TODO: should add support for options[:finder] and options[:id]

        all  = [:index] + (options[:all] || [])
        new  = [:new]   + (options[:new] || [])
        find = [:show, :edit, :update, :destroy] + (options[:find] || [])

        class_eval do
          before_filter :only => all do
            instance_variable_set("@#{variable_name.pluralize}", model.scoped)
          end

          before_filter :only => new do
            instance_variable_set("@#{variable_name}", model.new)
          end

          before_filter :only => find do
            instance_variable_set("@#{variable_name}", finder.call(model, params[:id]))
          end
        end
      end

      private
        def model_name(model)
          model.to_s.gsub(/::/, '_').underscore
        end
    end
  end
end