module Omega
  module Assets
    class << self
      def has_assets?(tram)
        File.exists?(tram.paths.public.first)
      end

      def delete(trams)
        options = trams.extract_options!
        trams = _normalize_trams(trams)

        trams.each do |t|
          next unless File.exists?(path = t.paths.public.first)
          delete_public(path)
        end
      end

      def refresh!(*trams)
        options = trams.extract_options!
        refresh(*(trams << options.merge(:force => true)))
      end

      def refresh(*trams)
        options = trams.extract_options!
        trams = _normalize_trams(trams)

        trams.each do |t|
          next unless File.exists?(path = t.paths.public.first)

          block = options[:force] ? nil :
                                    lambda { |s, d| not File.exists?(d) or File.mtime(s) > File.mtime(d) }

          copy_public(path, &block)
        end
      end

      private
        def _normalize_trams(trams)
          case trams
            when []
              trams = Trams::Base.subclasses
            when Trams::Base
              trams = Array.wrap(trams)
          end

          trams
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
