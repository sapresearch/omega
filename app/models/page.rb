class Page < ActiveRecord::Base
  has_many :page_blocks
  has_many :blocks, :through => :page_blocks
  has_many :page_components
  has_many :components, :through => :page_components

  def to_param
    return "home" if path == "/"
    path
  end
end
