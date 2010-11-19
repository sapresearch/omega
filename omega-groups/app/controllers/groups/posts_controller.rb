class Groups::PostsController < Omega::Controller
  respond_to :html, :xml, :json, :js

  breadcrumb 'Groups' => :groups

  before_filter :get_group
  before_filter :get_thread
  before_filter :get_posts, :only => [:index]
  before_filter :get_post,  :only => [:show, :edit, :update, :destroy]

  def index
    respond_with(@posts)
  end

  def show
    respond_with(@post)
  end

  def new
    @post = Group::Post.new
    respond_with(@post)
  end

  def edit
    respond_with(@post)
  end

  def create
    @post = Group::Post.create(params[:post]) do |post|
      post.author = current_user
      post.thread = @thread
    end
    respond_with(@post)
  end

  def update
    @post.update_attributes(params[:post])
    respond_with(@post)
  end

  def destroy
    @post.destroy
    respond_with(@post)
  end

  private
    def get_group
      @group = Group.find(params[:group_id])
      breadcrumb @group.name => group_path(@group)
      breadcrumb 'Threads' => group_threads_path(@group)
    end

    def get_thread
      @thread = @group.threads.find(params[:thread_id])
      breadcrumb @thread.title.truncate(40)  => group_thread_posts_path(@group, @thread).truncate(50)
    end

    def get_posts
      @posts = @thread.posts
    end

    def get_post
      @thread = @thread.posts.find(params[:id])
    end
end
