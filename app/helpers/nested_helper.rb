	module NestedHelper
	  REJECT_TEMPLATE = lambda { |v| v.key?('_template') }
	
	  def link_to_new_nested(builder, association, options = {}, &block)
	    text = options[:text] || "New #{association.to_s.singularize.humanize}"
	    url  = options[:url]  || "#new-#{association.to_s.singularize.underscore.dasherize}"
	    link_options    = (options.delete(:link) || {}).merge(:'data-new-nested' => association)
	    builder_options = options.delete(:builder) || {}
	
	    text = capture(&text) if text.respond_to?(:call)
	
	    link_to(text, url, link_options) +
	    new_nested_template(builder, association, builder_options, &block)
	  end
	
	  def link_to_remove_nested(builder, options = {}, &block)
	    url  = options[:url]  || "#remove"#"#remove-#{builder.object.class.to_s.singularize.underscore.dasherize}"
	    link_options = (options.delete(:link) || {}).merge(:'data-remove-nested' => true)
	
	    if block_given?
	      link = link_to(url, link_options, &block)
	    else
	      text = options[:text] || "Remove"
	      link = link_to(text, url, link_options)
	    end
	
	    builder.hidden_field(:_destroy) + link
	  end
	
	  private
	    def new_nested_template(builder, association, options = {})
	      object = builder.object.class.reflect_on_association(association).klass.new
	      div_options     = (options.delete(:div) || {}).merge(:id => "#{association}_fields_template",
	                                                           :style => 'display: none;')
	      builder_options = (options.delete(:builder) || {}).merge(:child_index => "_ID_")
	
	      content_tag(:div, div_options) do
	        builder.fields_for(association, object, builder_options) do |f|
	          yield(f)
	          concat(hidden_field_tag("#{f.object_name}_template", true, :name => "#{f.object_name}[_template]"))
	        end
	      end
	    end
	end
