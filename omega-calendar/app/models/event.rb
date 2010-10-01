#class DateMustBeBeforeValidator < ActiveModel::EachValidator
#  def validate_each(record, attribute, value)
#    case before = options[:before]
#      when Symbol
#        record.errors[attribute] << "must be before #{before}" unless value >= record.send(before)
#      else
#        record.errors[attribute] << 'must be before now' unless value >= DateTime.now
#    end
#  end
#end


class Event < ActiveRecord::Base

  belongs_to :calendar
  validates_presence_of :title
  validates :start_date, :presence => true#, :date_must_be_before => { :before => :end_date }
  validates :end_date, :presence => true

  validate do
    if allday
      errors[:start_date] << 'must be before end date' if start_date.try(:>, end_date)
    else
      errors[:start] << 'must be before end' if start.try(:>, self.end)
    end
  end

  def as_json(options = {})
    {
            :title => title,
            :start => start,
            :end => self.end,
            :allDay => allday,
            :url => url,
            :event_description => event_description
    }
  end

  def start_date
    start.try(:to_date)
  end

  def start_date=(value)
    self.start = "#{value} #{start_time}"
  end

  def start_time
    start.try(:to_s, :time)
  end

  def start_time=(value)
    self.start = "#{start_date} #{value}"
  end

  def end_date
    self.end.try(:to_date)
  end

  def end_date=(value)
    self.end = "#{value} #{end_time}"
  end

  def end_time
    self.end.try(:to_s, :time)
  end

  def end_time=(value)
    self.end = "#{end_date} #{value}"
  end
end
