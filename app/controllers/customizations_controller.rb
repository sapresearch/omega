class CustomizationsController < Controller
  def index
    @customization = @setting.customization
    @customizations = Customization.all
    @customization_edit_urls = @customizations.map{|c|edit_customization_url(c)}
  end

  def new
    @customization = Customization.new
  end

  def create
    @customization = Customization.create(params[:customization])
    @setting.customization = @customization
    @setting.save
    redirect_to root_url
  end

  def edit
    @customization = Customization.find(params[:id])
  end

  def update
    @customization = Customization.find(params[:id])
    @customization.update_attributes(params[:customization])
    @setting.customization = @customization
    @setting.save
    redirect_to root_url
  end
  
end
