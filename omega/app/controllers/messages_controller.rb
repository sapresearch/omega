class MessagesController < ApplicationController
  respond_to :html, :js

  sub_layout 'messages'

  before_filter :_get_messages,      :only => [:index]
  before_filter :_get_sent_messages, :only => [:sent]
  before_filter :_get_message,       :only => [:show, :update, :destroy]
  before_filter :_new_message,       :only => [:new]

  def index
    respond_with(@messages)
  end

  def sent
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
    elsif @message.to == current_user
      @message.touch(:deleted_by_to_at)
    else
      # require_permission !!
      @message.destroy
    end
    respond_with(@message)
  end

  private
    def _get_messages
      @messages = current_user.messages
    end

    def _get_sent_messages
      @messages = current_user.sent_messages
    end

    def _get_message
      @message = Message.find(params[:id])
    end

    def _new_message
      @message = Message.new
    end
end