class EventSource < Omega::Model
  class << self
    def for(source)
      EventSource.where(:source_id => source).where(:source_type => source.class).first
    end
  end

  belongs_to :event
  belongs_to :source, :polymorphic => true
end
