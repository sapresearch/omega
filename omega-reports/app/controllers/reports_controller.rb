class ReportsController < Omega::Controller
  respond_to :html
  #require_permission Volunteering::PERM_ADMIN

  require "report_app_adapter.rb"
  include ReportsHelper
  include ReportAppAdapter
  before_filter :init_data_feeds, :only=>[:index, :open_flash_chart, :high_charts, :google_chart_tools] 
  
  def index
  end
  
  # open flash chart test
  def open_flash_chart
    @graph = open_flash_chart_object(600,300,"/sandbox/reports/graph_code")
  end

  def graph_code
    title = Title.new("Position Hours Overview")
    bar = BarGlass.new
    bar.set_values([9,2,3,6,1])
    chart = OpenFlashChart.new
    chart.set_title(title)
    chart.add_element(bar)

    x = XAxis.new
    x.set_labels(['ESL teacher','Media contactor','position3','position4','position5'])
    chart.set_x_axis(x)

    render :text => chart.to_s
  end

  #high charts test
  def high_charts
  end

  #google chart tools test
  def google_chart_tools
  end

  # note: use wicked_pdf layouts?
  def print_file
    @head_html = params[:head_html]
    @report_html = params[:report_html]
    @title = "Omega_report"
    @template = "reports/print_file_template.pdf.erb"

    # this line will be changed in the final version
    tmp_file_path = "#{RAILS_ROOT}/../omega-reports/app/views/reports/print_file_template.pdf.erb"

    File.open(tmp_file_path, "w") do |f|
      f.write(process_head_html(@head_html))
      f.write(process_report_html(@report_html))
    end
    render :pdf => @title,
           :template => @template
  end

end
