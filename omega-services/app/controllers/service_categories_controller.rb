class ServiceCategoriesController < Omega::Controller
  def index
    @service_categories = ServiceCategory.all
  end
end

