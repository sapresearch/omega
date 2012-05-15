	class ServiceRegistration < Model
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

    # implementation subject to change
    def synchronize_calendar(new_status = "accepted", old_status = "pending", calendar = self.registrant.calendars.first)
      return if calendar.nil? 
      service = service_leaf.service
      
      service_leaf.service_sections.each do |service_section|
        if new_status == "accepted" && old_status != "accepted"
          calendar.events.create(:name=>service.name, :start_date=>service_section.event.start_at, :end_date=>service_section.event.end_at)
          if service_section.is_recurrent?
            start_at = service_section.event.start_at
            end_at = service_section.event.end_at            
            recurrence_end_at = service_section.event.event_recurrence.end_at
            while true
              break if start_at.nil?             
              interval = service_section.event.recurrence_interval(start_at)
              start_at += interval
              end_at += interval
              end_at.to_i <= recurrence_end_at.to_i ? calendar.events.create(:name=>service.name, :start_date=>start_at, :end_date=>end_at) : break
            end
          end
        elsif new_status != "accepted" && old_status == "accepted"
          calendar.events.where(:name=>service.name).destroy_all
        end
      end     
    end
	
	end
