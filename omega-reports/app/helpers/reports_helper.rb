module ReportsHelper

  REPORT_HEADLINE = "Omega Report"
  #EXTRA_STYLESHEETS = ["table.css"]
  #EXTRA_STYLE = ''

  def process_head_html(html)
    #html = add_stylesheets(html)
    #html = add_style(html)
    html = delete_title_tags(html)
    html = delete_meta_tags(html)
    html = delete_javascript_tags(html)
    html = delete_comments(html)
    html = set_utf8_encoding_meta_tag(html)
    html = process_stylesheet_tags(html)
  end
  
  def process_report_html(html)
    html = add_title(html)
    html = delete_javascript_tags(html)
    html = delete_comments(html)    
    #html = clean_up(html)
    html = process_stylesheet_tags(html)
  end

  def add_style(html)
    EXTRA_STYLE + html
  end
  
  # unfinished
  def add_stylesheets(html)
    host = "http://#{request.host_with_port}"
    EXTRA_STYLESHEETS.each do |s|
      html = "<link href='#{host}/stylesheets/#{s}' type='text/css'/>" + html
    end
    html
  end

  def add_title(html)
    "<div id='report_headline'>#{REPORT_HEADLINE}</div>"+html
  end

  def delete_javascript_tags(html)
    html.gsub!(/<script.*?>.*?<\/script>/m, "") || html
  end

  def delete_meta_tags(html)
    html.gsub!(/<meta .*?>/m, "") || html
  end

  def delete_title_tags(html)
    html.gsub!(/<title>.*?<\/title>/m, "") || html
  end

  def delete_comments(html)
    html.gsub!(/<!--.*?-->/m, "") || html
  end

  def set_utf8_encoding_meta_tag(html)
    html = '<meta http-equiv="content-type" content="text/html; charset=utf-8" />'+html
  end

  # unfinished
  def clean_up(html)
    html.gsub!(/<span class="google-visualization-table-sortind">.*?<\/span>/,"") || html
  end

  def process_stylesheet_tags(html)
    host = "http://#{request.host_with_port}"
    html.gsub!(/<link href=\"/, "<link href=\"#{host}") || html
  end
end

