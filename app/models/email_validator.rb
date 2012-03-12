	class EmailValidator < ActiveModel::EachValidator
	  def validate_each(record, attribute, value)
	    unless value =~ /\A(.*)@(.*)\.(.*)\Z/
	      record.errors[attribute] << (options[:message] || 'is not a valid email') 
	    end
	  end
	end
