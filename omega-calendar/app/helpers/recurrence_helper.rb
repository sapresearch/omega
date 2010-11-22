module RecurrenceHelper
  def recurrence(builder)
    render('shared/recurrence', :builder => builder)
  end
end
