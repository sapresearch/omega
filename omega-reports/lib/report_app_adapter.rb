module ReportAppAdapter

  # initialize reporting data.
  # implementation subject to change
  def init_data_feeds    
    init_employees
    init_positions
    init_jobs
    complete_associations
    init_items
  end

  def init_employees
    e0 = Report::Employee.new("Mike")
    e1 = Report::Employee.new("Jim")
    e2 = Report::Employee.new("Alice")
    e3 = Report::Employee.new("Bob")
    @employees = [e0,e1,e2,e3]
  end

  def init_positions
    p0 = Report::Position.new("ESL teacher")
    p1 = Report::Position.new("Helper")
    p2 = Report::Position.new("Cashier")
    p3 = Report::Position.new("Assistant")
    @positions = [p0,p1,p2,p3]
  end

  def init_jobs   
    j00 = Report::Job.new(@positions[0].name,5,@employees[0].name)
    j01 = Report::Job.new(@positions[1].name,3,@employees[0].name)
    j02 = Report::Job.new(@positions[2].name,2,@employees[0].name)
    j10 = Report::Job.new(@positions[0].name,1,@employees[1].name)
    j11 = Report::Job.new(@positions[1].name,10,@employees[1].name)
    j12 = Report::Job.new(@positions[3].name,1,@employees[1].name)
    j20 = Report::Job.new(@positions[1].name,1,@employees[2].name)
    j21 = Report::Job.new(@positions[2].name,7,@employees[2].name)
    j22 = Report::Job.new(@positions[3].name,2,@employees[2].name)
    j30 = Report::Job.new(@positions[0].name,6,@employees[3].name)
    j31 = Report::Job.new(@positions[1].name,8,@employees[3].name)
    j32 = Report::Job.new(@positions[2].name,3,@employees[3].name)
    @jobs = [j00,j01,j02,j10,j11,j12,j20,j21,j22,j30,j31,j32]
  end

  def complete_associations
    @employees.each do |e|
      e.jobs = @jobs.inject([]){|r,j|j.employee_name==e.name ? r<<j : r}
      e.position_names = e.jobs.inject([]){|r,j|r<<j.position_name}
      e.total_hours = e.jobs.inject(0){|r,j|r+j.hour}
    end
  
    @positions.each do |p|
      p.jobs = @jobs.inject([]){|r,j| j.position_name==p.name ? r<<j : r}
      p.employee_names = p.jobs.inject([]){|r,j|r<<j.employee_name}
      p.total_hours = p.jobs.inject(0){|r,j|r+j.hour}
    end
  end

  def init_items
    @report_items = {"Volunteer Working Hour"=>"working_hour","item1"=>"","item2"=>"","item3"=>"","item4"=>"","item5"=>""}
  end

  # Option2: Abstract layer functions, available for AJAX call
  def get_all_employees
    @employees
  end

  def get_employee_by_job(job)
    job.employee
  end

  def get_employees_by_position(position)
    position.employees
  end

  def get_all_positions
    @positions
  end

  def get_position_by_job(job)
    job.position
  end

  def get_positions_by_employee(employee)
    employee.positions
  end

  def get_all_jobs
    @jobs
  end

  def get_jobs_by_employee(employee)
    employee.jobs
  end

  def get_jobs_by_position(position)
    position.jobs
  end

end
