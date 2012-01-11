module HtmlHelper
  # indentation helpers
  def i(content)
    indent_by(content, 1)
  end

  def ii(content)
    indent_by(content, 2)
  end

  def iii(content)
    indent_by(content, 3)
  end

  def iiii(content)
    indent_by(content, 4)
  end

  alias_method :iv, :iiii

  def iiiii(content)
    indent_by(content, 5)
  end

  alias_method :v, :iiiii

  def iiiiii(content)
    indent_by(content, 6)
  end

  alias_method :vi, :iiiiii

  def indent_by(content, num)
    content.gsub /^/, "\t" * num
  end

  # strips leading and trailing newlines from partials
  def partial_strip(content)
    content.try(:strip)
  end

  # override view's render to strip partials inside the view
  #def render(*args)
    #partial_strip(super(*args))
  #end

  def cancel_button(options = {})
    name = options.delete(:name) || 'Cancel'
    data_link_to = options.delete(:url)

    tag :input, options.merge(:value => name, :'data-link-to' => data_link_to, :class => 'btnCtrl')
  end

  def text_area(name, content = nil, options = {})
    super(name, content, {:rows => 5}.merge(options))
  end

  def cust_button(text)
    content_tag(:span, text, :class => 'formBtn')
  end
  
  

 
  # om_button(:plain => true, :icon => 'some-icon') do
  #   link_to ...
  # end
  def om_button(options = {}, &block)
    plain = options[:plain] ? 'plain' : nil
    small = options[:small] ? 'small' : nil
    contact = options[:contact] ? 'contact' : nil
    sidebar = options[:sidebar] ? 'sidebar' : nil


    if options[:icon]
      icon_class = 'icon'
      icon = content_tag(:span, '', :class => "om-icon om-icon-#{options[:icon]}")
    else
      icon_class = nil
      icon = ''.html_safe
    end

    klass = ['om', plain, small, contact, sidebar, icon_class, 'button'].compact.join('-')

    content_tag(:span, :class => klass) do
      icon + capture(&block)
    end
  end

  def side_bar_box(title, &block)
   # content_tag(:div, :class => 'box-shadow') do
      content_tag(:h1, title, :class=>'side-bar corners-top') +
              content_tag(:div, :class => 'corners-bottom sidebar-menu-content') do
                capture(&block)
              end
 #   end


  end

  def context_box(&block)
    %Q{<div id="content_box">#{capture(&block)}</div>}.html_safe
    
    
  end
  
 
  


end
