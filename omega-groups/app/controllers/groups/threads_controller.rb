class Groups::ThreadsController < Omega::Controller
  respond_to :html, :xml, :json, :js

  breadcrumb 'Groups' => :groups

  before_filter :get_group
  before_filter :get_threads, :only => [:index]
  before_filter :get_thread, :only => [:show, :edit, :update, :destroy]

  


  def index
    @threads = @threads.paginate(:page => params[:page], :per_page => Group::Thread::MAX_THREADS_PER_PAGE)

    respond_with(@threads)
  end

  def show
    respond_with(@thread)
  end

  def new
    @thread = Group::Thread.new
    @thread.posts.build
    respond_with(@thread)
  end

  def edit
    respond_with(@thread)
  end

  def create
    @thread = Group::Thread.create(params[:group_thread]) do |thread|
      thread.group  = @group
      thread.author = current_user

      post = thread.posts.first
      post.author = current_user
      thread.caption = post.body.truncate(100)
    end

    respond_with(@thread)
  end

  def update
    @thread.update_attributes(params[:group_thread])
    respond_with(@thread)
  end

  def destroy
    @thread.destroy
    respond_with(@thread)
  end



  private
  def get_group
    @group = Group.find(params[:group_id])
    breadcrumb @group.name => group_path(@group)
    breadcrumb 'Threads' => group_threads_path(@group)
  end

  def get_threads
    @threads = @group.threads
  end

  def get_thread
    @thread = @group.threads.find(params[:id])
    breadcrumb @thread.title => group_thread_path(@group, @thread)
  end


end
