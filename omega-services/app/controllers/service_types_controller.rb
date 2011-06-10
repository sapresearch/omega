class ServiceTypesController < Omega::Controller
  def index
    @service_category=ServiceCategory.find(params[:service_category_id])
    @service_types = @service_category.service_types
  end
end

