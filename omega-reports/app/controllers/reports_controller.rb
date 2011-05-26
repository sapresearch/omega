class ReportsController < Omega::Controller
  #require_permission Volunteering::PERM_ADMIN

  require "report_app_adapter.rb"
  include ReportAppAdapter
  before_filter :init_data_feeds, :only=>[:index, :show, :open_flash_chart, :high_charts, :google_chart_tools]
  
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

  def show
    @report = params[:report]
  end

  # note: alternative use wicked_pdf layout
  def print_file
    @head_html = params[:head_html]
    @report_html = params[:report_html]
    @file_name = "omega_report"
    @template = "reports/print_file_template.pdf.erb"

    render :pdf => @file_name,
           #:layout => 'report.html',
           :template => @template          
  end

end
