module ReportsHelper

  REPORT_HEADLINE = "Omega Report"
  #EXTRA_STYLESHEETS = ["table.css"]
  EXTRA_STYLE = '
<style>
/* Copyright 2008 Google Inc. All Rights Reserved. */

.google-visualization-table-table {
  font-family: arial, helvetica;
  font-size: 10pt;
  cursor: default;
  margin: 0;
  background: white;
  border-spacing: 0;
}

.google-visualization-table-table tbody {
  background: transparent;
}

.google-visualization-table-table * {
  margin: 0;
  vertical-align: middle;
  padding: 2px;
}

.google-visualization-table-tr-head, .google-visualization-table-tr-head td, .google-visualization-table-tr-head-nonstrict {
  font-weight: bold;
  background: #fff url(title-bg.gif) repeat-x left bottom;
  text-align: center;
}

.google-visualization-table-tr-even, .google-visualization-table-tr-even td, .google-visualization-table-tr-even-nonstrict {
  background-color: #fff;
}

.google-visualization-table-tr-odd, .google-visualization-table-tr-odd td, .google-visualization-table-tr-odd-nonstrict {
  background-color: #fafafa;
}

.google-visualization-table-tr-sel, .google-visualization-table-tr-sel td, .google-visualization-table-tr-sel-nonstrict {
  background-color: #d6e9f8;
}

.google-visualization-table-tr-over, .google-visualization-table-tr-over td, .google-visualization-table-tr-over-nonstrict {
  background-color: #e7e9f9;
}

.google-visualization-table-sorthdr {
  cursor: pointer;
}

.google-visualization-table-sortind {
  color: #ccc;
  font-size: 9px;
  padding-left: 6px; /* do not chage - see table.js */
}

.google-visualization-table-th {
  border: 1px solid #eee;
  padding: 6px;
}

.google-visualization-table-th-webkit td, .google-visualization-table-th-webkit-nonstrict {
  background-color: #fff;
  border: 1px solid #eee;
  padding: 6px;
}

.google-visualization-table-td-freeze-rightmost {
  border-right-width: 4px;
}

.google-visualization-table-td {
  border: 1px solid #eee;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.google-visualization-table-td-bool {
  text-align: center;
  font-family: Arial Unicode MS, Arial, Helvetica;
}

.google-visualization-table-td-center {
  text-align: center;
}

.google-visualization-table-td-number {
  text-align: right;
  white-space: nowrap;
}

.google-visualization-table-seq {
  text-align: right;
  color: #666;
}

.google-visualization-table-div-page {
  margin: 2px 0 0 0;
  padding: 0;
}

/** Created from css_binary ./css:table_css */
html>body .goog-inline-block{display:-moz-inline-box;display:inline-block;}.goog-inline-block{position:relative;display:inline-block}* html .goog-inline-block{display:inline}*:first-child+html .goog-inline-block{display:inline}.goog-custom-button{margin:2px;border:0;pa\
dding:0;font-family:Arial,sans-serif;color:#000;background:#ddd url(//ssl.gstatic.com/editor/button-bg.png) repeat-x top left;text-decoration:none;list-style:none;vertical-align:middle;cursor:default;outline:none}.goog-custom-button-outer-box,.goog-custom-button-inner-\
box{border-style:solid;border-color:#aaa;vertical-align:top}.goog-custom-button-outer-box{margin:0;border-width:1px 0;padding:0}.goog-custom-button-inner-box{-moz-box-orient:vertical;margin:0 -1px;border-width:0 1px;padding:3px 4px;white-space:nowrap;}* html .goog-cust\
om-button-inner-box{left:-1px}* html .goog-custom-button-rtl .goog-custom-button-outer-box{left:-1px}* html .goog-custom-button-rtl .goog-custom-button-inner-box{right:auto}*:first-child+html .goog-custom-button-inner-box{left:-1px}*:first-child+html .goog-custom-butto\
n-rtl .goog-custom-button-inner-box{left:1px}::root .goog-custom-button,::root .goog-custom-button-outer-box{line-height:0}::root .goog-custom-button-inner-box{line-height:normal}.goog-custom-button-disabled{background-image:none!important;opacity:0.3;-moz-opacity:0.3;\
filter:alpha(opacity=30)}.goog-custom-button-disabled .goog-custom-button-outer-box,.goog-custom-button-disabled .goog-custom-button-inner-box{color:#333!important;border-color:#999!important}* html .goog-custom-button-disabled{margin:2px 1px!important;padding:0 1px!im\
portant}*:first-child+html .goog-custom-button-disabled{margin:2px 1px!important;padding:0 1px!important}.goog-custom-button-hover .goog-custom-button-outer-box,.goog-custom-button-hover .goog-custom-button-inner-box{border-color:#9cf #69e #69e #7af!important;}.goog-cu\
stom-button-active,.goog-custom-button-checked{background-color:#bbb;background-position:bottom left}.goog-custom-button-focused .goog-custom-button-outer-box,.goog-custom-button-focused .goog-custom-button-inner-box{border-color:orange}.goog-custom-button-collapse-rig\
ht,.goog-custom-button-collapse-right .goog-custom-button-outer-box,.goog-custom-button-collapse-right .goog-custom-button-inner-box{margin-right:0}.goog-custom-button-collapse-left,.goog-custom-button-collapse-left .goog-custom-button-outer-box,.goog-custom-button-col\
lapse-left .goog-custom-button-inner-box{margin-left:0}.goog-custom-button-collapse-left .goog-custom-button-inner-box{border-left:1px solid #fff}.goog-custom-button-collapse-left.goog-custom-button-checked .goog-custom-button-inner-box{border-left:1px solid #ddd}* htm\
l .goog-custom-button-collapse-left .goog-custom-button-inner-box{left:0}*:first-child+html .goog-custom-button-collapse-left .goog-custom-button-inner-box{left:0}.goog-flat-button{position:relative;margin:2px;border:1px solid #000;padding:2px 6px;font:normal 13px "Tre\
buchet MS",Tahoma,Arial,sans-serif;color:#fff;background-color:#8c2425;cursor:pointer;outline:none;-moz-outline:none}.goog-flat-button-disabled{border-color:#888;color:#888;background-color:#ccc;cursor:default}.goog-flat-button-hover{border-color:#8c2425;color:#8c2425;\
background-color:#eaa4a5}.goog-flat-button-active,.goog-flat-button-selected,.goog-flat-button-checked{border-color:#5b4169;color:#5b4169;background-color:#d1a8ea}.goog-flat-button-focused{border-color:#5b4169}.goog-flat-button-collapse-right{margin-right:0}.goog-flat-\
button-collapse-left{margin-left:0;border-left:none}.goog-button{color:#036;border-color:#036;background-color:#69c}.goog-button-disabled{border-color:#333;color:#333;background-color:#999}.goog-button-hover{color:#369;border-color:#369;background-color:#9cf}.goog-butt\
on-active{color:#69c;border-color:#69c}
/* End */

.google-visualization-table-div-page .goog-custom-button-inner-box {
  padding: 1px 5px;
}
</style>'

  def process_head_html(html)
    #html = add_stylesheets(html)
    html = add_style(html)
    html = delete_title_tags(html)
    html = delete_meta_tags(html)
    html = delete_javascript_tags(html)
    html = delete_comments(html)
    html = process_stylesheet_tags(html)
  end
  
  def process_report_html(html)
    html = add_title(html)
    html = delete_javascript_tags(html)
    html = delete_comments(html)
    html = clean_up(html)
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

  # unfinished
  def clean_up(html)
    html.gsub!(/<span class="google-visualization-table-sortind">.*?<\/span>/,"") || html
  end

  def process_stylesheet_tags(html)
    host = "http://#{request.host_with_port}"
    html.gsub!(/<link href=\"/, "<link href=\"#{host}") || html
  end
end

