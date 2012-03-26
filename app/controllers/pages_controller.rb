	class PagesController < Controller
	  respond_to :html
	  before_filter :get_page, :only => [:show, :edit, :update, :destroy]
	
	  def index
	    @pages = Page.scoped
	    respond_with(@pages)
	  end
	
	  def show
	    respond_with(@page)
	  end
	
	  def new
	    @page = Page.new
	    respond_with(@page)
	  end
	
	  def edit
	    respond_with(@page)
	  end
	
	  def create
	    @page = Page.create(params[:page])
	    respond_with(@page, :location => page_url(@page.path))
	  end
	
	  def update
	    @page.update_attributes(params[:page])
	    respond_with(@page)
	  end
	
	  def destroy
	    @page.destroy
	    respond_with(@page)
	  end
	
	  private
	    def get_page
	      @page = Page.find_by_path(params[:id])
	
	      unless @page
	        @page = Page.new(:path => params[:id])
	        render 'new'
	      end
	    end
	end
