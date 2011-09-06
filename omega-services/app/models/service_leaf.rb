class ServiceLeaf < ActiveRecord::Base
  belongs_to :service
  has_many :service_registrations, :dependent => :destroy
  has_many :registrants, :class_name=>"Contact", :through=>:service_registrations
  has_many :service_sections, :dependent => :destroy

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

end
