module Omega
  class FlashUploads
    def initialize(app, session_key, accept_key = '_accept')
      @app, @session_key, @accept_key = app, session_key, accept_key
    end

    def call(env)
      request = ActionDispatch::Request.new(env)

      if request.user_agent =~ /^(Adobe|Shockwave) Flash/
        if session_cookie = request.params[@session_key]
          env['HTTP_COOKIE'] = "#{@session_key}=#{session_cookie}".freeze
        end

        if accept = request.params[@accept_key]
          env['HTTP_ACCEPT'] = "#{accept}".freeze
        end
      end

      @app.call(env)
    end
  end
end
