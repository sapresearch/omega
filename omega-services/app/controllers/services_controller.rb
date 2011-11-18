class ServicesController < Omega::Controller

  require_dependency "application_lib.rb"
  require_dependency "service_app_adapter.rb"
  require_dependency "service_lib.rb"
  include ApplicationLib
  include ServiceAppAdapter
  include ServiceLib

  # app-spec
  breadcrumb 'Services' => :services
  # end app-spec

  respond_to :html, :js, :xml, :json

  #around_filter :services_exception_handler

  def index
    @service_id = params[:service_id]
    @service = Service.find_by_id(@service_id) unless @service_id.nil?   # use find_by_id to return nil in case no record

    # redirect to default index when the target service is missing
    if @service_id && @service.nil?
      redirect_to services_url
      return
    end
    
    session[:super_service_id] = @service.nil? ? (params[:super_service_id] || session[:super_service_id]) : @service.super_service_id
    @super_service = super_service
    @services = sub_services_of(@super_service)

    # for filters
    session[:my_services_switch] = params[:my_services_switch] || ( session[:my_services_switch] || "off" )
    session[:enrollable_switch] = params[:enrollable_switch] || ( session[:enrollable_switch] || "on" )
    session[:requestable_switch] = params[:requestable_switch] || ( session[:requestable_switch] || "on" )

    filter_services
    respond_with(@services)
  end

  def new
    session[:super_service_id] = params[:super_service_id] || session[:super_service_id]
    @service_level = params[:service_level] || Service::LEAF_LEVEL
    @super_service = super_service
    @service = new_sub_service_of(@super_service)
    
    @default_service_with_detail_template = @super_service ? @super_service.default_service_with_detail_template : nil
    @default_service_with_registration_template = @super_service ? @super_service.default_service_with_registration_template : nil
    @service_detail_html = @default_service_with_detail_template.detail_html if @default_service_with_detail_template
    @service_registration_html = @default_service_with_registration_template.registration_html if @default_service_with_registration_template

    # for js    
    @services_with_detail_template = Service.services_with_detail_template.sort{|s1,s2| s1.name<=>s2.name}
    @services_with_registration_template = Service.services_with_registration_template.sort{|s1,s2| s1.name<=>s2.name}

    # for service sections
    @contacts = Contact.all.sort{|c1,c2|c1.name<=>c2.name}
    @service.name = @service_level==Service::LEAF_LEVEL ? "New Service" : "New Service Category"
    @service_leaf = @service.build_service_leaf
    @service_section=@service_leaf.service_sections.build
    @service_sections=@service_leaf.service_sections
    @event = @service_section.build_event

    # automatically restore filters to default when creating a new service in order to view it.
    reset_filter_sessions   
    respond_with(@service)
  end

  def create
    Service.transaction do
      @service = Service.create(params[:service])

      # set the service level
      @service_level = params[:service_level]
      @service_leaf = @service.create_service_leaf(:register_type=>params[:service_register_type], :capacity=>(params[:service_capacity]=="unlimited" ? nil : params[:service_capacity])) if @service_level==Service::LEAF_LEVEL

      # service detail
      @service_detail_html = params[:service_detail_html]
      @service_detail_field_values = params[:service_detail_field_values]
      @service_detail_form = @service.create_service_detail_form(:html => @service_detail_html, :field_values=>@service_detail_field_values) unless @service_detail_html.empty?
      @has_service_detail_template = params[:has_service_detail_template]
      @service_detail_form.create_service_detail_template if @has_service_detail_template == "on" && @service_detail_form

      # service registration
      @service_registration_html = params[:service_registration_html]
      @service_registration_form = @service.create_service_registration_form(:html => @service_registration_html) unless @service_registration_html.empty?
      @has_service_registration_template = params[:has_service_registration_template]
      @service_registration_form.create_service_registration_template if @has_service_registration_template == "on" && @service_registration_form

      # service sections (re-factor to service_sections_contoller if nested form is used in the future)
      if @service_leaf
        @service_sections = params[:service_sections]
        @service_sections.each_value do |service_section|
          @contact_id = service_section["contact_id"]
          @location = service_section["location"]
          @start_at = service_section["start_at"]
          @end_at = service_section["end_at"]
          @event = Event.create(:location=>@location, :start_at=>@start_at, :end_at=>@end_at)
          @service_section = @service_leaf.service_sections.create(:contact_id=>@contact_id, :event_id=>@event.id)
          if service_section["recurrence"]=="on"
            @recurrence_years = service_section[:recurrence_years]
            @recurrence_months = service_section[:recurrence_months]
            @recurrence_days = service_section[:recurrence_days]
            @recurrence_hours = service_section[:recurrence_hours]
            @recurrence_minutes = service_section[:recurrence_minutes]
            @interval = ActiveSupport::JSON.encode({:year=>@recurrence_years, :month=>@recurrence_months, :day=>@recurrence_days, :hour=>@recurrence_hours, :minute=>@recurrence_minutes}).to_s
            @recurrence_end_at = service_section[:recurrence_end_at]
            @event.create_event_recurrence(:interval=>@interval, :end_at=>@recurrence_end_at)
          end
        end
      end
      
    end
    
    respond_with(@service, :location=>services_url(:service_id=>@service.id))
  end

  def edit
    @service_id = params[:id]
    @service = Service.find(@service_id)    
    @super_service = super_service
    @service_level = @service.is_leaf? ? Service::LEAF_LEVEL : Service::BRANCH_LEVEL

    @default_service_with_detail_template = @service.default_service_with_detail_template
    @default_service_with_registration_template = @service.default_service_with_registration_template
    @service_detail_html = @default_service_with_detail_template.detail_html if @default_service_with_detail_template
    @service_detail_html = @service.detail_html if @service.detail_html
    @service_registration_html = @default_service_with_registration_template.registration_html if @default_service_with_registration_template
    @service_registration_html = @service.registration_html if @service.registration_html

    # for js
    @services_with_detail_template = Service.services_with_detail_template.sort{|s1,s2| s1.name<=>s2.name}
    @services_with_registration_template = Service.services_with_registration_template.sort{|s1,s2| s1.name<=>s2.name}

    # for service sections
    if @service_level == Service::LEAF_LEVEL
      @contacts = Contact.all.sort{|c1,c2|c1.name<=>c2.name}
      @service_sections = @service.service_sections
    end

    # automatically set filters to default
    reset_filter_sessions    
    respond_with(@service)
  end

  def update
    @service = Service.find(params[:id])
    @recursive = (params[:recursive]=="true"||params[:recursive]==true) ? true :false
    case params[:type]
      when "publish"
        @service.publish(@recursive)
      when "unpublish"
        @service.unpublish(@recursive)
      when "block"
        @service.block
      when "unblock"
        @service.unblock
      else
        Service.transaction do
          @service.update_attributes(params[:service])

          # get the service level
          @service_level = params[:service_level]
          if @service_level==Service::LEAF_LEVEL
            @service_leaf = @service.service_leaf
            @service_leaf.update_attributes(:register_type=>params[:service_register_type], :capacity=>(params[:service_capacity]=="unlimited" ? nil : params[:service_capacity]))
          end

          # service detail
          @service_detail_html = params[:service_detail_html]
          @service_detail_field_values = params[:service_detail_field_values]
          @has_service_detail_template = params[:has_service_detail_template]
          
          if @service_detail_html.empty?
            @service.service_detail_form.destroy if @service.has_service_detail_form?
          elsif @service.has_service_detail_form?
            @service_detail_form = @service.service_detail_form
            @service_detail_form.update_attributes(:html => @service_detail_html, :field_values=>@service_detail_field_values)
            if @service.has_service_detail_template? && @has_service_detail_template != "on"
              @service.service_detail_template.destroy
            elsif !@service.has_service_detail_template? && @has_service_detail_template == "on"
              @service_detail_form.create_service_detail_template
            end
          else
            @service_detail_form = @service.create_service_detail_form(:html => @service_detail_html, :field_values=>@service_detail_field_values)
            @service_detail_form.create_service_detail_template if @has_service_detail_template == "on"
          end

          # service registration
          @service_registration_html = params[:service_registration_html]
          @has_service_registration_template = params[:has_service_registration_template]

          if @service_registration_html.empty?
            @service.service_registration_form.destroy if @service.has_service_registration_form?
          elsif @service.has_service_registration_form?
            @service_registration_form = @service.service_registration_form
            @service_registration_form.update_attributes(:html => @service_registration_html)
            if @service.has_service_registration_template? && @has_service_registration_template != "on"
              @service.service_registration_template.destroy
            elsif !@service.has_service_registration_template? && @has_service_registration_template == "on"
              @service_registration_form.create_service_registration_template
            end
          else
            @service_registration_form = @service.create_service_registration_form(:html => @service_registration_html)
            @service_registration_form.create_service_registration_template if @has_service_registration_template == "on"
          end

          # service sections (re-factor to service_sections_contoller if nested form is used in the future)          
          if @service_leaf
            @service_section_ids=[]
            @original_service_section_ids = @service.service_section_ids
            @service_section_params = params[:service_sections]
            
            @service_section_params.each_value do |service_section|
              @contact_id = service_section["contact_id"]
              @location = service_section["location"]
              @start_at = service_section["start_at"]
              @end_at = service_section["end_at"]
              if service_section["recurrence"]=="on"
                @recurrence_years = service_section[:recurrence_years]
                @recurrence_months = service_section[:recurrence_months]
                @recurrence_days = service_section[:recurrence_days]
                @recurrence_hours = service_section[:recurrence_hours]
                @recurrence_minutes = service_section[:recurrence_minutes]
                @interval = ActiveSupport::JSON.encode({:year=>@recurrence_years, :month=>@recurrence_months, :day=>@recurrence_days, :hour=>@recurrence_hours, :minute=>@recurrence_minutes}).to_s
                @recurrence_end_at = service_section[:recurrence_end_at]
              end
              
              @id = service_section["id"]
              unless @id.empty?
                @service_section_ids << @id.to_i
                @service_section = ServiceSection.find(@id)
                @event = @service_section.event
                @event.update_attributes(:location=>@location, :start_at=>@start_at, :end_at=>@end_at)
                @service_section.update_attributes(:contact_id=>@contact_id)
                if service_section["recurrence"]=="on"
                  if @service_section.is_recurrent?
                    @event.event_recurrence.update_attributes(:interval=>@interval, :end_at=>@recurrence_end_at)
                  else
                    @event.create_event_recurrence(:interval=>@interval, :end_at=>@recurrence_end_at)
                  end                
                elsif service_section["recurrence"]!="on"
                  if @service_section.is_recurrent?
                    @event.event_recurrence.destroy
                  end
                end
              else
                @event = Event.create(:location=>@location, :start_at=>@start_at, :end_at=>@end_at)
                @service_section = @service_leaf.service_sections.create(:contact_id=>@contact_id, :event_id=>@event.id)                
                @event.create_event_recurrence(:interval=>@interval, :end_at=>@recurrence_end_at) if service_section["recurrence"]=="on"
              end             
            end
            @service_section_ids_to_delete = @original_service_section_ids - @service_section_ids
            ServiceSection.destroy(@service_section_ids_to_delete)
          end
        end
    end

    # for js
    @services = @service.sibling_services

    filter_services
    respond_with(@service, :location=>services_url(:service_id=>@service.id))
  end

  def destroy
    @service = Service.find(params[:id])
    @service.destroy 
    @super_service = super_service
    @services = sub_services_of(@super_service)

    filter_services
    respond_with(@service)
  end


  private

  def super_service
    (session[:super_service_id] && session[:super_service_id]!=Service::ROOT_SUPER_SERVICE_ID ) ? Service.find(session[:super_service_id]) : nil
  end

  def sub_services_of(super_service)
    super_service ? super_service.sub_services : Service.service_roots
  end

  def new_sub_service_of(super_service)
    super_service ? super_service.sub_services.build : Service.new({:super_service_id=>nil})
  end

end

