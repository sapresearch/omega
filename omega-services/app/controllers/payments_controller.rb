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
    # dummy data
    @service_leaf = ServiceLeaf.first
    @service = @service_leaf.service
    
    @notify_url =  ipn_handler_payments_url(:payer_id=>current_user.id, :payable_type=>@payable_type, :payable_id=>@payable_id)
    @return_url = services_url(:service_id=>@service.id)
    @cancel_return_url = services_url(:service_id=>@service.id)   
  end

  def ipn_handler
    # Create a notify object we must
    notify = Paypal::Notification.new(request.raw_post)

    #we must make sure this transaction id is not already completed
    if !Payment.count("*", :conditions => ["transaction_id = ?", notify.transaction_id]).zero?
      # do some logging here...
    end

    @service_leaf = ServiceLeaf.find(notify.item_id)
    @payer_id = params[:payer_id]
    @payable_id = params[:payable_id]
    @payable_type = params[:payable_type]

    if notify.acknowledge
      @payment = Payment.find_by_paypal_transaction_id(notify.transaction_id) ||
        Payment.create(
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
        if notify.complete? and @service_leaf.price == BigDecimal.new( params[:mc_gross] ) #transaction complete.. add your business logic here
          @payment.status = notify.status
        else #Reason to be suspicious
          logger.error("Failed to verify Paypal's notification, please investigate")
        end
      rescue => e # we have a bug
        @payment.status = 'Error'
        raise
      ensure #make sure we logged everything we must
        @payment.save
      end
    else #transaction was not acknowledged
      # another reason to be suspicious
    end
    render :nothing => true
  end

=begin
  def ipn_handler
    # Create a notify object we must
    notify = Paypal::Notification.new(request.raw_post)

    #we must make sure this transaction id is not already completed
    if !Payments.count("*", :conditions => ["paypal_transaction_id = ?", notify.transaction_id]).zero?
      # do some logging here...
    end

    @service_leaf = ServiceLeaf.find(notify.item_id)

    if notify.acknowledge
      @payment = Payment.find_by_confirmation(notify.transaction_id) ||
        enrollment.invoice.payments.create(:amount => notify.amount,
          :payment_method => 'paypal', :confirmation => notify.transaction_id,
          :description => notify.params['item_name'], :status => notify.status,
          :test => notify.test?)
      begin
        if notify.complete? and @service_leaf.price == BigDecimal.new( params[:mc_gross] ) #transaction complete.. add your business logic here
          @payment.status = notify.status
        else #Reason to be suspicious
          logger.error("Failed to verify Paypal's notification, please investigate")
        end
      rescue => e # we have a bug
        @payment.status = 'Error'
        raise
      ensure #make sure we logged everything we must
        @payment.save
      end
    else #transaction was not acknowledged
      # another reason to be suspicious
    end
    render :nothing => true
  end
=end
end

