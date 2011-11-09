version = File.read(File.expand_path('../../VERSION', __FILE__)).strip

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'omega-volunteering'
  s.version     = version
  s.summary     = 'Summary'
  s.description = 'Description.'

  s.author   = 'SAP AG'
  s.email    = 'samuel.kadolph@sap.com'
  s.homepage = 'http://omegaportal.org'

  s.files        = Dir['CHANGELOG', 'README', 'LICENSE', '*/**/*']
  s.require_path = 'lib'

  s.add_dependency('omega',          version)
  s.add_dependency('omega-contacts', version)
  s.add_dependency('zipcodr', '0.0.2')
  s.add_dependency('faster_haversine', '0.1.3')
  s.add_dependency('gmapper', '0.2.1')
  s.add_dependency('kamel', '0.1.2')
end
