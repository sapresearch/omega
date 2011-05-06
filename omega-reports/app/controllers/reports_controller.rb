class ReportsController < Omega::Controller
  respond_to :html

  def index
    @graph = open_flash_chart_object(600,300,"/reports/graph_code")
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
end

