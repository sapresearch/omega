class Report
  attr_accessor :name, :partial_name
  def initialize(name = nil, partial_name = nil)
    @name = name
    @partial_name = partial_name
  end
end