class Block < ActiveRecord::Base
end

class HtmlBlock < Block
  def self.model_name
    superclass.model_name
  end
end