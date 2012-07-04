#require 'selenium/webdriver'
#Selenium::WebDriver::Firefox::Binary.path = 'C:\Program Files (x86)\Mozilla Firefox\firefox.exe'
Capybara.default_selector = :css
Capybara.app_host = "http://ymqdomega2.dhcp.ymq.sap.corp:3002"

Capybara.javascript_driver = :webkit
Capybara.default_driver = :selenium
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app,
    :browser => :remote,
    :url => "http://10.6.227.222:4444/wd/hub",
#    :url => "http://10.6.227.107:4444/wd/hub",
#    options are :firefox, :chrome, :internet_explorer, :opera, :safari
    :desired_capabilities => :firefox)
end