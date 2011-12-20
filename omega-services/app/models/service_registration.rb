class ServiceRegistration < ActiveRecord::Base
  # app-spec
  belongs_to :registrant, :class_name=>"Contact"
  # end app-spec
  belongs_to :service_leaf
  has_one :service_registration_form_value
  has_one :payment, :as=>:payable
  
  class << self
    
    # select services that is registered by a contact, or contains any service registered by a contact from a collection of services
    def filter_services_by_registrant(services, contact)
		return [] if contact.nil?
      registered_services = contact.registered_services

      filtered_services = services.select do |s|
        registered_services.include?(s) || begin
          val = false;
          registered_services.each do |rs|
            if rs.is_descendant_of?(s)
              val = true
              break
            end
          end
          val
        end
      end
      filtered_services
    end
    
  end

  def service
    service_leaf.service
  end

  def field_values
    return nil if service_registration_form_value.nil?
    service_registration_form_value.field_values
  end

  def field_values_hash
    return nil if service_registration_form_value.nil?
    ActiveSupport::JSON.decode(service_registration_form_value.field_values)
  end

end
