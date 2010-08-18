class Volunteering::PositionsController < ApplicationController
  # GET /volunteering_positions
  # GET /volunteering_positions.xml
  def index
    @volunteering_positions = Volunteering::Position.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @volunteering_positions }
    end
  end

  # GET /volunteering_positions/1
  # GET /volunteering_positions/1.xml
  def show
    @position = Volunteering::Position.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @position }
    end
  end

  # GET /volunteering_positions/new
  # GET /volunteering_positions/new.xml
  def new
    @position = Volunteering::Position.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @position }
    end
  end

  # GET /volunteering_positions/1/edit
  def edit
    @position = Volunteering::Position.find(params[:id])
  end

  # POST /volunteering_positions
  # POST /volunteering_positions.xml
  def create
    @position = Volunteering::Position.new(params[:position])

    respond_to do |format|
      if @position.save
        format.html { redirect_to(@position, :notice => 'Position was successfully created.') }
        format.xml  { render :xml => @position, :status => :created, :location => @position }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @position.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /volunteering_positions/1
  # PUT /volunteering_positions/1.xml
  def update
    @position = Volunteering::Position.find(params[:id])

    respond_to do |format|
      if @position.update_attributes(params[:position])
        format.html { redirect_to(@position, :notice => 'Position was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @position.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /volunteering_positions/1
  # DELETE /volunteering_positions/1.xml
  def destroy
    @position = Volunteering::Position.find(params[:id])
    @position.destroy

    respond_to do |format|
      format.html { redirect_to(volunteering_positions_url) }
      format.xml  { head :ok }
    end
  end
end
