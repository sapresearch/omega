class Groups::PostsController < Omega::Controller
  respond_to :html, :xml, :json

  before_filter :get_posts, :only => [:index]
  before_filter :get_post,  :only => [:show, :edit, :update, :destroy]

  def index
    @posts = Group::Post.scoped
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
      post.thread = Group.find(params[:group_id]).threads.find(params[:thread_id])
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
    def get_posts
      @posts = Group.find(params[:group_id]).threads.find(params[:thread_id]).posts
    end

    def get_post
      @thread = Group.find(params[:group_id]).threads.find(params[:thread_id]).posts.find(params[:id])
    end
end
