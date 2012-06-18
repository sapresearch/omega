module RecurrenceHelper
  def recurrence(builder, hidden=false)
    render('shared/recurrence', :builder => builder, :hidden => hidden )
  end
end