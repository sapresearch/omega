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

  s.add_dependency "rails", "~> 3.1.1"
  s.add_dependency "jquery-rails"
end
