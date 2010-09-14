class ServicesController < ApplicationController

  respond_to :html, :xml, :js, :json

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


       @step = params[:step]

        case params[:step]
          when '1'
            render "services/step_1"
          when '2'
            render "services/step_2"
          when '3'
            render "services/step_3"
        end

     end

     def new_custom_service
       @service = Service.new
       respond_with(@service)
     end
  
     def create
       @service = Service.create(params[:service])
       redirect_to service_wizard_services_url(:step => 2, :id => @service.id)
     end

     def edit
       @service = Service.find(params[:id])
       respond_with(@service)
     end

     def update
      @service = Service.find(params[:id])
      @service.update_attributes(params[:service])
      redirect_to service_wizard_services_url(:step => 3, :id => @service.id)

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

     def get_type_id
       @service = Service.new
       @service.fields.build
       @s = Service::Type.find_by_service_type(params[:service_type])
       render :partial => 'service_details'
     end

  #--------------------------------------------------------------------------------------------------
    private
  
    def get_services_list
      Service::Type.all.collect {|s| [s.service_type, s.service_type]}
    end

end
