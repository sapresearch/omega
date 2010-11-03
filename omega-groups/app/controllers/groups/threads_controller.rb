class Groups::ThreadsController < Omega::Controller
  respond_to :html, :xml, :json

  before_filter :get_threads, :only => [:index]
  before_filter :get_thread,  :only => [:show, :edit, :update, :destroy]

  def index
    respond_with(@threads)
  end

  def show
    respond_with(@thread)
  end

  def new
    @thread = Group::Thread.new
    respond_with(@thread)
  end

  def edit
    respond_with(@thread)
  end

  def create
    @thread = Group::Thread.create(params[:thread]) do |thread|
      thread.group = Group.find(params[:group_id])
    end
    respond_with(@thread)
  end

  def update
    @thread.update_attributes(params[:thread])
    respond_with(@thread)
  end

  def destroy
    @thread.destroy
    respond_with(@thread)
  end

  private
    def get_threads
      @threads = Group.find(params[:group_id]).threads
    end

    def get_thread
      @thread = Group.find(params[:group_id]).threads.find(params[:id])
    end
end
