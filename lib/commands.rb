if ARGV.empty?
  ARGV << '--help'
end

HELP_TEXT = <<-EOT
Usage: omega COMMAND [ARGS]

All commands can be run with -h for more information.
EOT


case ARGV.shift
  when '--help', '-h'
    puts HELP_TEXT
  when '--version', '-v'
    ARGV.unshift '--version'
    require 'commands/application'
  else
    puts 'Error: Command not recognized'
    puts HELP_TEXT
end
