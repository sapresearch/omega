$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "omega/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "omega"
  s.version     = Omega::VERSION
  s.authors     = ["TODO: Your name"]
  s.email       = ["TODO: Your email"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of Omega."
  s.description = "TODO: Description of Omega."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.0"
  s.add_dependency "jquery-rails"
  s.add_dependency('zipcodr', '0.0.2')
  s.add_dependency('faster_haversine', '0.1.3')
  s.add_dependency('gmapper', '0.2.1')
  s.add_dependency('accepts-flattened-values', '~>0.1.3')
  s.add_dependency('paperclip', '~>2.3')
  s.add_dependency('mime-types', '=1.16')
  s.add_dependency('will_paginate', '>= 3.0.pre2', '<= 3.0.2')
  s.add_dependency('activemerchant')
  s.add_dependency('httparty')
end
