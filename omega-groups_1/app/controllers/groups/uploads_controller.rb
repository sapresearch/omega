class Groups::UploadsController < Omega::Controller
  respond_to :html, :xml, :json, :js
  
  breadcrumb 'Groups' => :groups

  before_filter :get_group
  before_filter :get_uploads, :only => [:index]
  before_filter :get_upload,  :only => [:show, :edit, :update, :destroy]

  def index
    respond_with(@uploads)
  end

  def show
    respond_with(@upload)
  end

  def new
    @upload = GroupUpload.new do |gu|
      gu.build_upload
    end
    respond_with(@upload)
  end

  def edit
    respond_with(@upload)
  end

  def create
    if uploads = params[:group_uploads]
      @uploads = uploads.map do |_, upload|
        GroupUpload.create(upload) do |u|
          u.group = @group
        end
      end

      respond_with(@uploads)
    else
      @upload = GroupUpload.create(params[:upload]) do |upload|
        upload.group = @group
      end
      
      respond_with(@upload)
    end
  end

  def update
    @upload.update_attributes(params[:upload])
    respond_with(@upload)
  end

  def destroy
    @upload.destroy
    respond_with(@upload)
  end

  private
    def get_group

      @group = Group.find(params[:group_id])
      breadcrumb @group.name => group_path(@group)
       breadcrumb 'Uploads' => group_uploads_path(@group)
    end

    def get_uploads
      @uploads = @group.group_uploads
    end

    def get_upload
      @upload = @group.group_uploads.find(:upload_id => params[:id])
    end
end
