module Omega
  class ApplicationResponder < ActionController::Responder
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
      else #put?
        display resource
      end
    end
  end
end
