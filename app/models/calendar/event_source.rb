	class Calendar::EventSource < Model
	  class << self
	    def for(source)
	      where(:source_id => source).where(:source_type => source.class).first
	    end
	  end
	
	  belongs_to :calendar
	  belongs_to :event
	  belongs_to :source, :polymorphic => true
	
	  serialize :mapping, Hash
	
	  def mapping
	    super || Hash.new
	  end
	end
