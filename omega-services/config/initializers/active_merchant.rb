require "active_merchant"

if Rails.env.production?
  PAYPAL_ACCOUNT = Settings.first.user.email
else
  PAYPAL_ACCOUNT = 'tang_1324417292_biz@gmail.com'
  ActiveMerchant::Billing::Base.mode = :test
end
