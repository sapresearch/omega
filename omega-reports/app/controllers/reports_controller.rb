class ReportsController < Omega::Controller
  respond_to :html
  before_filter :init_data_feeds

  def index    
  end

    class DUser
      attr_accessor :name, :jobs, :total_hours
      def initialize(name, jobs)
        @name = name
        @jobs = jobs
        @total_hours = @jobs.inject(0){|s,j|s+j.hour}
      end
    end

    class DJob
      attr_accessor :position, :hour
      def initialize(position, hour)
        @position = position
        @hour = hour
      end
    end

    class DPosition
      attr_accessor :name
      def initialize(name)
        @name = name
      end
    end

  def init_data_feeds
    p1 = DPosition.new("ESL teacher")
    p2 = DPosition.new("Helper")
    p3 = DPosition.new("Cashier")
    p4 = DPosition.new("Assistant")
    @ps = [p1,p2,p3,p4]
    u1 = DUser.new("Mike",[DJob.new(p1,5), DJob.new(p2,3), DJob.new(p3,2)])
    u2 = DUser.new("Jim",[DJob.new(p1,1), DJob.new(p2,10), DJob.new(p4,1)])
    u3 = DUser.new("Alice",[DJob.new(p2,1), DJob.new(p3,7), DJob.new(p4,2)])
    u4 = DUser.new("Bob",[DJob.new(p1,6), DJob.new(p2,8), DJob.new(p3,3)])
    @us = [u1,u2,u3,u4]
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

end