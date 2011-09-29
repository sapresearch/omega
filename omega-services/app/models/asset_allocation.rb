class AssetAllocation < ActiveRecord::Base
  belongs_to :asset
  belongs_to :service_leaf
end



