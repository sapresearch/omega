class ImagesController < Omega::Controller
  respond_to :html
  

  def edit_logo
    @logo = Image.new
    
  end
  
  def create
		id = params[:image][:id]
		banner_or_logo = params[:image][:banner_or_logo]

		# Edit an existing image.
		#if (!Image.find(id).nil?) then
		if (!id.nil?) then
			Image.update_all({:image_in_use => TRUE}, {:id => id})
			Image.update_all({:banner_or_logo => banner_or_logo}, {:id => id})

		# Create a new image.
		else
    	@image = Image.create(params[:image])
			id = @image.id
			Image.update_all({:image_in_use => TRUE}, {:id => id})
		end

		Image.where("id != ?", id).where("banner_or_logo = ?", banner_or_logo).update_all(:image_in_use => FALSE)
    redirect_to :root
  end
end
