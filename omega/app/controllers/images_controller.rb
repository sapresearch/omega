class ImagesController < Omega::Controller
  respond_to :html
  

  def edit_logo
    @logo = Image.new
    
  end
  
  def create
    
    @logo = Image.create(params[:image])
      
    redirect_to :root
  end
end
