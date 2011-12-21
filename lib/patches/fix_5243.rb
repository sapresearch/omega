# fix to be able to override route generated helpers again
# https://rails.lighthouseapp.com/projects/8994-ruby-on-rails/tickets/5243-cannot-override-helpers-generated-by-routes

ActiveSupport.on_load(:action_controller) do
  class << self
    def view_context_class
      @view_context_class ||= begin
        controller = self
        Class.new(ActionView::Base) do
          if controller.respond_to?(:_routes)
            include controller._routes.url_helpers
          end

          if controller.respond_to?(:_helpers)
            include controller._helpers

            self.helpers = controller._helpers
          end
        end
      end
    end
  end
end
