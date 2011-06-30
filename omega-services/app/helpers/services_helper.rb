module ServicesHelper

  #testing
  def is_admin?(user)
    true
  end
=begin
  def detail_field_values(service)
    j = ActiveSupport::JSON
    field_values = j.decode(service.detail_field_values)
    html = ""
    field_values.each do |key, value|

    end
  end
=end
end

