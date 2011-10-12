class ServiceLeaf < ActiveRecord::Base
  belongs_to :service
  has_many :service_registrations, :dependent => :destroy
  has_many :registrants, :class_name=>"Contact", :through=>:service_registrations
  has_many :service_sections, :dependent => :destroy
  has_many :asset_allocations, :dependent => :destroy
  has_many :assets, :through => :asset_allocations
  
  accepts_nested_attributes_for :service_sections

  def accepted_registrants
    service_registrations.select{|sr|sr.status=="accepted"}.map{|sr|sr.registrant}
  end

  def is_blocked?
    is_blocked
  end

  def block
    update_attribute(:is_blocked, true)
  end

  def unblock
    update_attribute(:is_blocked, false)
  end

  def periods_union(begin_at=Time.now, until_at=begin_at+1.year)
    service_sections.inject([]){|r, ss| Event.periods_union(r,ss.event.to_i_periods(begin_at, until_at).to_a)}
  end

  def time_overlapping_periods_with(service_leaf, begin_at=Time.now, until_at=begin_at+1.year)
    periods_union_1 = self.periods_union(begin_at, until_at)
    periods_union_2 = service_leaf.periods_union(begin_at, until_at)
    return Event.periods_intersection(periods_union_1,periods_union_2)
  end

end
