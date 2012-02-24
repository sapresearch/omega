source "http://rubygems.org"

gemspec
gem 'rails', "~> 3.2.0"
platforms :jruby do
	gem 'activerecord-jdbcmysql-adapter'
	gem 'activerecord-jdbc-adapter'
	gem 'jruby-openssl'
end

gem "sqlite3", :platform => :ruby
gem 'mysql2', '0.3.7'
gem "jquery-rails"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   "~> 3.2.0"
  gem 'coffee-rails', "~> 3.2.0"
  gem 'uglifier'
end

gem 'accepts-flattened-values', :path => '../accepts-flattened-values'
