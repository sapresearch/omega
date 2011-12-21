class PaymentsController < Omega::Controller

  require "application_lib.rb"
  include ApplicationLib

  require 'money'
  require 'active_merchant'
  require 'active_merchant/billing/integrations/action_view_helper'
  ActionView::Base.send(:include, ActiveMerchant::Billing::Integrations::ActionViewHelper)
  include ActiveMerchant::Billing::Integrations

  respond_to :html, :js, :xml, :json
  #around_filter :services_exception_handler

  def new
    @payable_type = params[:payable_type]
    @payable_id = params[:payable_id]
    @payer_id = params[:payer_id]
    @return_url = params[:return_url]
    @return_method = params[:return_method]
    @cancel_return_url = params[:cancel_return_url]
    @notify_url =  ipn_handler_payments_url(:payer_id=>@payer_id, :payable_type=>@payable_type, :payable_id=>@payable_id)

    @payable = @payable_type.constantize.find(@payable_id)
  end

  def ipn_handler
    # Create a notify object we must
    notify = Paypal::Notification.new(request.raw_post)

    #we must make sure this transaction id is not already completed
    if !Payment.count("*", :conditions => ["transaction_id = ?", notify.transaction_id]).zero?
      # do some logging here...
    end

    @payer_id = params[:payer_id]
    @payable_id = params[:payable_id]
    @payable_type = params[:payable_type]
    @payable = @payable_type.constantize.find(@payable_id)

    if notify.acknowledge
      @payment = Payment.find_by_paypal_transaction_id(notify.transaction_id) ||
        Payment.new(
          :payer_id=>@payer_id,
          :payable_id=>@payable_id,
          :payable_type=>@payable_type,
          :amount => notify.amount,
          :payment_method => 'paypal',
          :transacion_id => notify.transaction_id,
          :description => notify.params['item_name'],
          :status => notify.status,
          :is_test => notify.test?
        )
      begin
        if notify.complete? and @payable.price == BigDecimal.new( params[:mc_gross] ) #transaction complete.. add your business logic here
          @payment.status = notify.status
        else #Reason to be suspicious
          #logger.error("Failed to verify Paypal's notification, please investigate")
        end
      rescue => e # we have a bug
        @payment.status = 'failed'
        raise
      ensure #make sure we logged everything we must
        @payment.save
      end
    else #transaction was not acknowledged
      # another reason to be suspicious
    end
    render :nothing => true
  end
end

