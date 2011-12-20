require "active_merchant"

if Rails.env.production?
  PAYPAL_ACCOUNT = 'admin@omega.com'
else
  PAYPAL_ACCOUNT = 'kexia.tang@gmail.com'
  ActiveMerchant::Billing::Base.mode = :test
end
