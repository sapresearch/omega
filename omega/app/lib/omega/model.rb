module Omega
  class Model < ActiveRecord::Base


    private
      # Override how ActiveRecord handles errors on associations to remove each attribute from the parent and only
      # show "#{relfieciton.name} is invalid"
      def association_valid?(reflection, association)
        return true if association.destroyed? || association.marked_for_destruction?

        unless valid = association.valid?
            errors.add(reflection.name)
        end
        valid
    end
  end
end
