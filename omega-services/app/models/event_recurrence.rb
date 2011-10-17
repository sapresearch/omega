class EventRecurrence < ActiveRecord::Base
  belongs_to :event

  def is_endless?
    end_at.nil?
  end
end

