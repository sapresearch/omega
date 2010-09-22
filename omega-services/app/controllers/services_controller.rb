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

     def new
     end

     def new_import
        @import = Import.create(params[:import])
        respond_with(@import)
     end

     def service_wizard

       @service = Service.find_by_id(params[:id])
       @services = get_services_list


       session[:current_step] = params[:step]

       if (params[:id].nil?) and (params[:step].nil?)
          session[:service_id] = nil
       end

       @current_service = session[:service_id]

       session[:service_id] = params[:id]

       unless @service.nil?

       @fields = Service::Field.find_all_by_service_id_and_field_category(params[:id], "Registration")
       @details = Service::Detail.find_all_by_service_id(params[:id])

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

     def new_custom_service
       @service = Service.new
       respond_with(@service)
     end
  
     def create
       unless params[:service][:type_attributes].nil?
        params[:service][:type_attributes][:service_type] = params[:service][:service_type]
        params[:service][:type_attributes][:service_category] = params[:service][:service_category]
        params[:service][:type_attributes][:icon] = params[:service][:icon]
        params[:service][:type_attributes][:description] = params[:service][:description]
       end

       if (params[:commit] == "Save")
         @current_step = session[:current_step]
         redirect_to service_wizard_services_url(:step => @current_step.to_i+1, :id => session[:service_id])



      else if (params[:commit] == "Save & Proceed")
          @current_step = session[:current_step]
          @incomplete_service = Service.find_by_id(session[:service_id])

          unless @incomplete_service.nil?
            @incomplete_service.destroy
          end

          logger.debug "Content Type is  #{params[:service][:icon].content_type}"

          @service = Service.create(params[:service])

          redirect_to service_wizard_services_url(:step => @current_step.to_i+1, :id => @service.id)
            

      end

      end

     end


     def edit
       @service = Service.find(params[:id])
       respond_with(@service)
     end

     def update
      @service = Service.find(params[:id])
      @service.update_attributes(params[:service])

      unless params[:fields].nil?
        params[:fields].each_value { |field| @service.fields.build(field)
      }
      end


      @current_step = session[:current_step]

        if (params[:commit] == "Save")
          
          @service.save
          redirect_to service_wizard_services_url(:step => @current_step, :id => @service.id)

        end
        if (params[:commit] == "Proceed")
          redirect_to service_wizard_services_url(:step => @current_step.to_i+1, :id => @service.id)

        end

     end

     def finalize
       @service = Service.find(params[:id])
       @service.update_attributes(:published => '1')
       redirect_to service_url(@service)
     end

     def export_to_csv
       @fields = Service::Field.all
       @services = Service.all

         services_csv = FasterCSV.generate do |csv|
           # header row
           csv << ["Service Type", "Field Name", "Field Type"]

           # data rows
           @fields.each do |f|
             @services.each do |s|
               if s.id == f.service_id
                   csv << [s.service_type, f.field_name, f.field_type]
               end
             end
           end
         end

         send_data(services_csv, :type => 'text/csv', :filename => 'services.csv')
     end

     def type_def

       @service = Service.new
       @service.build_type
       render :partial => 'service_without_type'

     end


     def get_type
       @service = Service.new
       @s = Service::Type.find_by_service_type(params[:service_type])
       @fields = Service::Typefield.all
       render :partial => 'service_details'
     end


     def add_field
       @service = Service.find_by_id(params[:id])
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
