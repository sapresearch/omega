version = File.read(File.expand_path('../../VERSION', __FILE__)).strip

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'omega-reports'
  s.version     = version
  s.summary     = 'Summary'
  s.description = 'Description.'

  s.author   = 'SAP AG'
  s.email    = 'kexia.tang@sap.com'
  s.homepage = 'http://omegaportal.org'

  s.files        = Dir['CHANGELOG', 'README', 'LICENSE', '*/**/*']
  s.require_path = 'lib'

  s.add_dependency('omega', version)
  #s.add_dependency('ruport')
  #s.add_dependency('ruport-util')
  #s.add_dependency('acts_as_reportable')
  #s.add_dependency('wkhtmltopdf')
  #s.add_dependency('wkhtmltopdf-binary')
  s.add_dependency('wicked_pdf')
end

