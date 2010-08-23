version = File.read(File.expand_path('../../VERSION', __FILE__)).strip

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'omega'
  s.version     = version
  s.summary     = 'Summary'
  s.description = 'Description.'

  s.required_ruby_version = '>= 1.8.7'

  s.author   = 'SAP AG'
  s.email    = 'samuel.kadolph@sap.com'
  s.homepage = 'http://omegaportal.org'

  s.files        = Dir['CHANGELOG', 'README', 'LICENSE', '*/**/*']
  s.require_path = 'lib'

  s.bindir             = 'bin'
  s.executables        = ['omega']
  s.default_executable = 'omega'

  s.add_dependency('trams',               trams_version = '>=0.1.0')
  s.add_dependency('trams-assets',        trams_version)
  s.add_dependency('trams-custom-fields', trams_version)
  s.add_dependency('trams-files',         trams_version)
  s.add_dependency('trams-logs',          trams_version)
  
  s.add_dependency('accepts-flattened-values', '>=0.1.3')
end