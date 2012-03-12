	class Asset < Model
	  require 'util.rb'
	  
	  has_many :asset_allocations, :dependent=>:destroy
	  has_many :service_leaves, :through => :asset_allocations
	
	  NAME_MAX_LENGTH = 100
	
	  def services(refresh=false)
	    service_leaves(refresh).map{|sl|sl.service}.sort{|s1,s2|s1.name<=>s2.name}
	  end
	
	  # not in use
	  def time_overlapping_service_pairs(begin_at=Time.now, until_at=begin_at+1.year)
	    service_pairs = []
	    service_combinations = services.to_combinations
	    service_combinations.each do |sc|
	      sc.to_a.map{|s|s.periods_union(begin_at,until_at)}.each do |periods_a|
	        service_pairs << sc unless Event.periods_intersection(periods_a).empty?
	      end
	    end
	  end
	  
	end
	
