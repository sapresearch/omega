require "active_merchant"

# TODO commented this out to test in production.
# Can't seem to require Omega::Setting in this file.
#if Rails.env.production?
#  PAYPAL_ACCOUNT = Setting.first.user.email
#else
  PAYPAL_ACCOUNT = 'tang_1324417292_biz@gmail.com'
  ActiveMerchant::Billing::Base.mode = :test
#end
