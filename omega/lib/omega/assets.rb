module Omega
  module Assets
    class << self
      def has_assets?(mod)
        File.exists?(mod.paths.public.first)
      end

      def delete(mods)
        options = modules.extract_options!
        mods = _normalize_modules(mods)

        mods.each do |mod|
          next unless File.exists?(path = mod.paths.public.first)
          delete_public(path)
        end
      end

      def refresh!(*mods)
        options = mods.extract_options!
        refresh(*(mods << options.merge(:force => true)))
      end

      def refresh(*mods)
        options = mods.extract_options!
        mods = _normalize_modules(mods)

        mods.each do |mod|
          next unless File.exists?(path = mod.paths.public.first)

          block = options[:force] ? nil :
                                    lambda { |s, d| not File.exists?(d) or File.mtime(s) > File.mtime(d) }

          copy_public(path, &block)
        end
      end

      private
        def _normalize_modules(mods)
          case mods
            when []
              Omega::Module::Base.subclasses
            when Omega::Module::Base
              Array.wrap(mods)
          end
        end

        def copy_public(source, destination = Rails.application.paths.public.first, &block)
          Dir.entries(source).each do |file|
            next if file[0, 1] == '.' # skip ., .. and hidden folders (like .svn)

            s, d = File.join(source, file), File.join(destination, file)

            if File.directory?(s)
              FileUtils.mkdir_p(d)
              copy_public(s, d, &block)
            else
              next if block_given? and not block.call(s, d)
              FileUtils.copy(s, d)
              Rails.logger.info "\n\nRefreshed public file `#{s}'"
            end
          end
        end

        def delete_public(source, destination = Rails.application.paths.public.first, &block)

        end
    end
  end
end
