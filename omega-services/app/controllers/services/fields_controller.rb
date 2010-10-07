class Services::FieldsController < ApplicationController

    respond_to :html, :xml, :js, :json

    before_filter :get_service

     def index
       @detail_fields = Service::Detail.find_all_by_service_id(@service.id)
       @registration_fields = Service::Field.find_all_by_service_id(@service.id)

       respond_with(@fields)
     end

     def new
       @field = Service::Field.new
       respond_with(@field)
     end

     def create
       @field = Service::Field.create(params[:service_field])
       if @field.save
         redirect_to service_service_fields_url(@field.service_id)
       else
         render :action => 'new'
       end
     end

     def edit
       @field = Service::Field.find(params[:id])
       respond_with(@field)
     end

     def update
       @field = Service::Field.find(params[:id])
       @field.update_attributes(params[:field])
       respond_with(@field)
     end

    private

    def get_service
      if params[:service_id]
        @service = Service.find(params[:service_id])
      end
    end

end

