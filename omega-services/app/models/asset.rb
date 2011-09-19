class Asset < ActiveRecord::Base
  has_many :asset_allocations, :dependent=>:destroy
end

