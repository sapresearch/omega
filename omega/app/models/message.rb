class Message < ActiveRecord::Base
  belongs_to :to,   :class_name => 'User', :inverse_of => :messages
  belongs_to :from, :class_name => 'User', :inverse_of => :sent_messages

  validates :subject, :presence  => true,
                      :length    => 3..255,
                      :allow_nil => true

  def read?
    read_at.try(:<=, Time.now) == true
  end

  def subject
    super || '(no subject)'
  end
end
