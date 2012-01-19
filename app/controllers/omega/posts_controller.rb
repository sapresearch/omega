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
        if @topic
          redirect_to space_group_url(@group)
        else
          redirect_to topic_url(@post.root_topic, :group_id=>@group.id)
        end
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

  def destroy
    @group = Group.find(params[:group_id])
    @post = Post.find(params[:id])
    @topic = @post.root_topic
    @post.destroy
  end

end