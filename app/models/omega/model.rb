module Omega
  class Model < ActiveRecord::Base
    self.abstract_class = true

    class << self
      private
        def has_upload(association_id, options = {})
          has_one("#{association_id}_upload", options.merge(:class_name => '::Upload', :as => :binding))

          class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
            def #{association_id}
              send(:'#{association_id}_upload')
            end

            def #{association_id}=(value)
              case value
                when File
                  send(:'#{association_id}_upload=', Upload.create!(:upload => value))
                when String, Integer
                  send(:'#{association_id}_upload=', Upload.find(value.to_i))
                else
                  send(:'#{association_id}_upload=', value)
              end
            end
          RUBY_EVAL
        end

#        def has_uploads(association_id, options = {})
#          association = "#{association_id.singularize}_uploads"
#          has_many(association, options.merge(:class_name => '::Upload', :as => :binding))
#
#          class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
#            def #{association_id}
#              #{association}
#            end
#
##            def #{association_id}=(value)
##              case value
##                when File
##                  send(:'#{association_id}_upload=', Upload.create!(:upload => value))
##                when String, Integer
##                  send(:'#{association_id}_upload=', Upload.find(value.to_i))
##                else
##                  send(:'#{association_id}_upload=', value)
##              end
##            end
#          RUBY_EVAL
#        end
    end

    has_many :favorites, :as => :item, :dependent => :destroy

    def favorite_text
      "#{self}"
    end

    private
      # Override how ActiveRecord handles errors on associations to remove each attribute from the parent and only
      # show "#{reflection.name} is invalid"
      def association_valid?(reflection, association)
        return true if association.destroyed? || association.marked_for_destruction?

        unless valid = association.valid?
            errors.add(reflection.name)
        end
        valid
    end
  end
end
