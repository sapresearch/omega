class Asset < ActiveRecord::Base
  has_many :asset_allocations, :dependent=>:destroy
  has_many :service_leaves, :through => :asset_allocations

  def services
    service_leaves.map{|sl|sl.service}.sort{|s1,s2|s1.name<=>s2.name}
  end
end

