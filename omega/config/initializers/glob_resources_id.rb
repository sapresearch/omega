module ActionDispatch::Routing::Mapper::Resources
  RESOURCE_OPTIONS << :glob_id

  class Resource
    def member_scope
      glob_id? ? "#{path}/*id" : "#{path}/:id"
    end

    def nested_scope
      glob_id? ? "#{path}/*#{singular}_id" : "#{path}/:#{singular}_id"
    end

    private
      def glob_id?
        @options[:glob_id]
      end
    end
end