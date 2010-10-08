class ServicesController < ApplicationController

  respond_to :html, :xml, :js, :json

  breadcrumb 'Services' => :services      

     def index

       @services = Service.all
       respond_with(@services)

     end

     def show

       @service = Service.find(params[:id])
       @fields = Service::Field.all
       respond_with(@service)

     end

     def show_drafts

       @services = Service.find(:all, :conditions => ['published =? ', 0])

     end

     def new

       @service = Service.new
       respond_with(@service)

     end

     def service_wizard

       if (params[:step].eql?("introduction"))
         session[:service_id] = nil
       end

       unless params[:id].nil?
         session[:service_id] = params[:id]
       end

       @services = get_services_list

       @service = Service.find_by_id(session[:service_id])

       session[:current_step] = params[:step]
       @current_service = session[:service_id]

       unless @service.nil?

         @registration_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Registration Details")
         @service_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Service Details")
         @details = Service::Detail.find_all_by_service_id(session[:service_id])

         session[:service_id] = @service.id

       end

       case params[:step]

         when '1'
            render "services/step_1"
         when '2'
            render "services/step_2"
         when '3'
            render "services/step_3"
         when '4'
            render "services/step_4"
       end


     end
 
     def create
       
       unless params[:service][:type_attributes].nil?
        params[:service][:type_attributes][:service_type] = params[:service][:service_type]
        params[:service][:type_attributes][:service_category] = params[:service][:service_category]
        params[:service][:type_attributes][:icon] = params[:service][:icon]
        params[:service][:type_attributes][:description] = params[:service][:description]
       end

       if params[:save]

          @current_step = session[:current_step]
          redirect_to service_wizard_services_url(:step => @current_step.to_i+1)

       end

       if params[:next]

          @current_step = session[:current_step]
          @incomplete_service = Service.find_by_id(session[:service_id])

          unless @incomplete_service.nil?
              @incomplete_service.destroy
          end

          @service = Service.create(params[:service])

          @service.fields.each do |f|
            f.detail.service_id = @service.id
          end

          @service.save

          session[:service_id] = @service.id
          
          redirect_to service_wizard_services_url(:step => @current_step.to_i+1)

       end
       
     end

     def modify_service

       @service = Service.find(params[:id])

       @registration_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Registration Details")
       @service_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Service Details")
       @details = Service::Detail.find_all_by_service_id(session[:service_id])

       respond_with(@service)

     end


     def update

      @service = Service.find_by_id(session[:service_id])
      @service.update_attributes(params[:service])

      unless params[:fields].nil?
        params[:fields].each_value { |field| @service.fields.build(field)
      }
      end

      @current_step = session[:current_step]

      if params[:save]

          @service.save
          session[:service_id] = @service.id
          redirect_to service_wizard_services_url(:step => @current_step)

      end

      if params[:next]

         session[:service_id] = @service.id
         redirect_to service_wizard_services_url(:step => @current_step.to_i+1)

      end


      if params[:update]

          @service.save
          respond_with(@service)

      end

     end

     def finalize

       @service = Service.find(params[:id])
       @service.update_attributes(:published => '1')
       redirect_to service_url(@service)

     end

     def type_def

       @service = Service.new
       @service.build_type
       render :partial => 'service_without_type'

     end

     def get_type

       @typed_service = Service::Type.find_by_service_type(params[:service_type])

       @service = Service.new
       @service.fields.build do |f|
           f.build_detail
        end if @service.fields.empty?

       if @typed_service.icon_file_name.nil?
          @typed_service.icon_file_name    = "missing.png"
          @typed_service.icon_content_type = "image/png"
       end
      
       @fields = Service::Typefield.all

       render :partial => 'create_service_form'

     end

     def add_service_field

       @service = Service.find_by_id(session[:service_id])

       @field = Service::Field.new
       @field.build_detail

     end

     def add_registration_field

       @field = Service::Field.new

     end

     def destroy

       @service = Service.find(params[:id])
       @service.destroy
       redirect_to services_url
       
     end

  #--------------------------------------------------------------------------------------------------
     private
  
     def get_services_list
        Service::Type.all.collect {|s| [s.service_type, s.service_type]}
     end
end
