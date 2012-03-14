module Omega::Mixins
  module ActionView
    module FormBuilderSuggestedField
      extend ActiveSupport::Concern

      def suggested_field(method, options = {})
        name  = "#{method}_values"
        url   = options.delete(:url) || ''
        input = ActionView::Helpers::InstanceTag.new(@object_name, name, @template)
        tag_id   = input.send(:tag_id)
        tag_name = input.send(:tag_name)

        @template.text_field(@object_name, name, objectify_options(options)) +
        @template.javascript_tag do
          %Q{$('##{tag_id}').autoSuggest('#{url}', { asHtmlID: '#{tag_id}', preFill: 'abc,123,'});} +
          %Q{$('[name=as_values_#{tag_id}]').attr('name', '#{tag_name}');}
        end
      end
    end
  end
end
