version = File.read(File.expand_path('../../VERSION', __FILE__)).strip

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'omega-groups'
  s.version     = version
  s.summary     = 'Summary'
  s.description = 'Description.'

  s.author   = 'SAP AG'
  s.email    = 'samuel.kadolph@sap.com'
  s.homepage = 'http://omegaportal.org'

  s.files        = Dir['CHANGELOG', 'README', 'LICENSE', '*/**/*']
  s.require_path = 'lib'

  s.add_dependency('omega', version)
end