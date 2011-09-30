class EventRecurrence < ActiveRecord::Base
  belongs_to :event

  def is_endless?
    ent_at.nil?
  end
end

