module TopicsHelper

  require_dependency "application_lib.rb"
  include ApplicationLib

  def announcement_sign
    image_tag "/images/announcement.png"
  end    

end

