version = File.read(File.expand_path('../../VERSION', __FILE__)).strip

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'omega-services'
  s.version     = version
  s.summary     = 'Summary'
  s.description = 'Description.'

  s.required_ruby_version = '>= 1.8.7'

  s.author            = 'Samuel Kadolph'
  s.email             = 'samuel.kadolph@sap.com'
  s.homepage          = 'http://omegaportal.org'

  s.files        = Dir['CHANGELOG', 'README', 'LICENSE', 'lib/**/*']
  s.require_path = 'lib'

  s.add_dependency('omega', version)

  s.add_dependency('paperclip', '~>2.3')
end