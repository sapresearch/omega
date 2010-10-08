class Services::FieldsController < ApplicationController

    respond_to :html, :xml, :js, :json

    before_filter :get_service

     def new

       @field = Service::Field.new
       @field.build_detail

       respond_with(@field)

     end

     def create

       @field = Service::Field.create(params[:service_field])
       @field.save
       redirect_to service_url(@field.service_id)


     end

     def edit

       @field = Service::Field.find(params[:id])
       respond_with(@field)

     end

     def update

       @field.update_attributes(params[:service_field])
       redirect_to service_url(@field.service_id)

     end

    private

    def get_service

      if params[:service_id]
        @service = Service.find(params[:service_id])
      end
    end

end

