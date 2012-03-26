	class MessagesController < Controller
	  respond_to :html, :js
	
	#  sub_layout 'messages'
	
	  breadcrumb 'Messages' => :messages
	
	  before_filter :_get_messages, :sort, :only => [:index]
	  before_filter :_get_sent_messages, :only => [:sent]
	  before_filter :_get_message, :only => [:show, :update, :destroy]
	  before_filter :_get_original_message, :only => [:reply, :forward]
	  before_filter :_new_message, :only => [:new]
	
	  def index
	    @messages = @messages.paginate(:page => params[:page], :per_page => Message::MAX_MESSAGES_PER_PAGE)
	
	    respond_with(@messages)
	  end
	
	  def sent
	    @messages = @messages.paginate(:page => params[:page], :per_page => Message::MAX_MESSAGES_PER_PAGE)
	    respond_with(@messages)
	  end
	
	  def show
	    if not @message.read? and @message.to == current_user
	      @message.touch(:read_at)
	    end
	
	    respond_with(@message)
	  end
	
	  def new
	    respond_with(@message)
	  end
	
	  def reply
	    @message = @original_message.reply
	    breadcrumb "Reply" => reply_message_path(@original_message)
	    respond_with(@message)
	  end
	
	  def forward
	    @message = @original_message.forward
	    breadcrumb "Forward" => forward_message_path(@original_message)
	    respond_with(@message)
	  end
	
	  def create
	    @message = Message.create(params[:message]) do |m|
	      m.from = current_user
	    end
	
	    respond_with(@message)
	  end
	
	  def update
	    @message.update_attributes(params[:message])
	    respond_with(@message)
	  end
	
	  def destroy
	    if @message.from == current_user
	      @message.touch(:deleted_by_from_at)
	    end
	
	    if @message.to == current_user
	      @message.touch(:deleted_by_to_at)
	    end
	
	#    else
	#      # require_permission !!
	#      @message.destroy
	#    end
	    respond_with(@message)
	  end
	
	  SORT_KEYS       = ['created_at']
	  SORT_DIRECTIONS = ['asc', 'desc']
	
	  def sort
	    params.each do |attr, direction|
	      next unless SORT_KEYS.include?(attr) and SORT_DIRECTIONS.include?(direction)
	      @messages = @messages.order("#{attr} #{direction}")
	    end
	  end
	
	
	  private
	  def _get_messages
	    @messages = current_user.messages
	    breadcrumb "Inbox" => messages_path
	  end
	
	  def _get_sent_messages
	    @messages = current_user.sent_messages
	
	    breadcrumb "Sent" => sent_messages_path
	  end
	
	  def _get_message
	    @message = Message.find(params[:id])
	    breadcrumb "#{@message.subject}" => message_path(@message)
	  end
	
	  def _get_original_message
	    @original_message = Message.find(params[:id])
	    breadcrumb "#{@original_message.subject}" => message_path(@original_message)
	  end
	
	  def _new_message
	    @message = Message.new
	    breadcrumb "New" => new_message_path
	  end
	end
