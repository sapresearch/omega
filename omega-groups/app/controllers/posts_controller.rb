class PostsController < Omega::Controller

  require_dependency "application_lib.rb"
  include ApplicationLib
  
  respond_to :html, :xml, :json, :js

  def create
    @post = Post.create(params[:post])
    @group = Group.find(params[:group_id])
    @topic = @post.topic
    if @topic
      @topic.groups << @group
      @topic.save
    end
    respond_with(@post) do |format|
      format.js do       
        redirect_to space_group_url(@group) if @topic
      end
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes(params[:post])
    @group = Group.find(params[:group_id])
    @topic = @post.root_topic
    respond_with(@post)
  end

end