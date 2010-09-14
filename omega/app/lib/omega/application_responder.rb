module Omega
  class ApplicationResponder < ActionController::Responder
    # Adds a concrete responder for javascript responses. Acts very similar to <tt>navigation_behaviour</tt> except that
    # instead of redirecting to <tt>show</tt>, renders <tt>on_create</tt>, <tt>on_update</tt> and <tt>on_destroy</tt>.
    def to_js
      default_render
    rescue ActionView::MissingTemplate => error
      if get?
        raise error
      elsif has_errors? && default_action
        render :action => default_action
      elsif post?
        render :action => :on_create
      elsif put?
        render :action => :on_update
      elsif delete?
        render :action => :on_destroy
      end
    end

    def to_json
      default_render
    rescue ActionView::MissingTemplate => error
      raise error unless resourceful?

      if get?
        display resource
      elsif has_errors?
        display resource.errors, :status => :unprocessable_entity
      elsif post?
        display resource, :status => :created, :location => api_location
      else
        display resource
      end
    end
  end
end
