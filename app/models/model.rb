  class Model < ActiveRecord::Base
    self.abstract_class = true
    belongs_to :account

		# Validation to call in various subclasses.
		def validate_current_account
			errors.add(:account_id, 'The Account ID must be for the current account') if account.id != Account.current.id
		end

		# This validates uniqueness within the current tenant only.
		# This can be used in any model like:
		# class User < Model
		# 	validates_unique :username
		# end
		def self.validates_unique(*attr_names)
			options = attr_names.extract_options!
			validates_each(attr_names, options) do |record, attribute, value|
				klass = record.class
				find_method = "find_by_#{attribute}".to_sym
				duplicates = klass.send(find_method, value)
				duplicates = nil if duplicates == record # so it doesn't match itself.
				record.errors[attribute] << "This #{attribute} is already taken" if duplicates
			end
		end

	
	def self.build_default_scope
      if method(:default_scope).owner != ActiveRecord::Base.singleton_class
        evaluate_default_scope { default_scope }
      elsif default_scopes.any?
        evaluate_default_scope do
          default_scopes.inject(relation) do |default_scope, scope|
            if scope.is_a?(Hash)
              default_scope.apply_finder_options(scope)
            elsif !scope.is_a?(ActiveRecord::Relation) && scope.respond_to?(:call)

							# This overrides the standard #build_default_scope method.
							# We override it to allow us to pass a Proc as a default_scope.
							# If the default_scope is a proc, then it will respond_to the #arity method.
							# Then it is evaluaeed as scope.call(self) rather than scope.call.
							# If you get a strange error with a different version of rails, then check 
							# the source code to see if this method has changed. This is from Rails version 3.2.1
              if scope.respond_to?(:arity) && scope.arity == 1
                scope = scope.call(self)
              else
                scope = scope.call
              end
              default_scope.merge(scope)
				 			# End of the different part.

            else
              default_scope.merge(scope)
            end
          end
        end
      end
    end

    default_scope do |model|
      model.where(:account_id => Account.current)
    end

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
