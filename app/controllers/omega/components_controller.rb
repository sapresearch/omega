module Omega
	class ComponentsController < Omega::Controller
	  before_filter :get_parent
	
	  # GET /components
	  # GET /components.xml
	  def index
	    @components = @scope
	
	    respond_to do |format|
	      format.html # index.html.erb
	      format.xml  { render :xml => @components }
	    end
	  end
	
	  # GET /components/1
	  # GET /components/1.xml
	  def show
	    @component = @scope.find(params[:id])
	
	    respond_to do |format|
	      format.html # show.html.erb
	      format.xml  { render :xml => @component }
	    end
	  end
	
	  # GET /components/new
	  # GET /components/new.xml
	  def new
	    @component = @scope.build
	
	    respond_to do |format|
	      format.html # new.html.erb
	      format.xml  { render :xml => @component }
	    end
	  end
	
	  # GET /components/1/edit
	  def edit
	    @component = @scope.find(params[:id])
	  end
	
	  # POST /components
	  # POST /components.xml
	  def create
	    # @component = @scope.new(params[:component])
	    Component.new
	    @component = HtmlComponent.new(params[:component])
	    @page.components << @component
	
	    respond_to do |format|
	      if @component.save
	        format.html { redirect_to([@page, @component], :notice => 'Component was successfully created.') }
	        format.xml  { render :xml => @component, :status => :created, :location => @component }
	      else
	        format.html { render :action => "new" }
	        format.xml  { render :xml => @component.errors, :status => :unprocessable_entity }
	      end
	    end
	  end
	
	  # PUT /components/1
	  # PUT /components/1.xml
	  def update
	    @component = @scope.where('components.id = ?', params[:id]).first
	
	    respond_to do |format|
	      if @component.update_attributes(params[:component])
	        format.html { redirect_to([@page], :notice => 'Component was successfully updated.') }
	        format.xml  { head :ok }
	      else
	        format.html { render :action => "edit" }
	        format.xml  { render :xml => @component.errors, :status => :unprocessable_entity }
	      end
	    end
	  end
	
	  # DELETE /components/1
	  # DELETE /components/1.xml
	  def destroy
	    @component = @scope.find(params[:id])
	    @component.destroy
	
	    respond_to do |format|
	      format.html { redirect_to([@page, :components]) }
	      format.xml  { head :ok }
	    end
	  end
	
	  private
	    def get_parent
	      if params[:page_id]
	        @page = Page.find_by_path!(params[:page_id])
	        @scope = @page.components
	      else
	        @scope = Component.scoped
	      end
	    end
	end
end
