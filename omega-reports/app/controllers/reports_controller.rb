class ReportsController < Omega::Controller
  respond_to :html
  before_filter :init_data_feeds

  def index    
  end

  module DataFeed
    class User
      attr_accessor :name, :jobs
      def initialize(name, jobs)
        @name = name
        @jobs = jobs
      end

      class Job
        attr_accessor :position, :hour
        def initialize(position, hour)
          @position = position
          @hour = hour
        end
      end
      
      class Position
        attr_accessor :name
        def initialize(name)
          @name = name
        end
      end      
    end
  end

  def init_data_feeds
=begin
    p1 = Datafeed::Position.new("ESL teacher")
    p2 = Datafeed::Position.new("Helper")
    p3 = Datafeed::Position.new("Cashier")
    p4 = Datafeed::Position.new("Assistant")
    @ps = [p1,p2,p3,p4]
    u1 = DataFeed::User.new("Mike",[Datafeed::Job.new(p1,5), Datafeed::Job.new(p2,3), Datafeed::Job.new(p3,2)])
    u2 = DataFeed::User.new("Jim",[Datafeed::Job.new(p1,1), Datafeed::Job.new(p2,10), Datafeed::Job.new(p4,1)])
    u3 = DataFeed::User.new("Alice",[Datafeed::Job.new(p2,1), Datafeed::Job.new(p3,7), Datafeed::Job.new(p4,2)])
    u4 = DataFeed::User.new("Bob",[Datafeed::Job.new(p1,6), Datafeed::Job.new(p2,8), Datafeed::Job.new(p3,3)])
    @us = [u1,u2,u3,u4]
=end
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

