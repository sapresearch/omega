class Message < Omega::Model

  MAX_MESSAGES_PER_PAGE = 10

  PERM_ADMIN = 'messages_admin'
  PERM_SEND  = 'messages_send'
  PERM_VIEW  = 'messages_view'

  belongs_to :to,   :class_name => 'User', :inverse_of => :messages
  belongs_to :from, :class_name => 'User', :inverse_of => :sent_messages

  scope :read, where('read_at <= ?', Time.now)
  scope :unread, where('read_at > ?', Time.now)
  default_scope order('created_at desc')

  validates :subject, :presence  => true,
                      :length    => 3..255,
                      :allow_nil => true

  def read?
    read_at.try(:<=, Time.now) == true
  end

  def subject
    super
  end

  def reply
    Message.new do |r|
      r.to = from
      r.subject = "RE: #{subject}"
      r.body = "\n\n\n" +
               " > From: #{from.username}\n" +
               " > To: #{to.username}\n" +
               " > Sent: #{created_at}\n" +
               " > Subject: #{subject}\n" +
               " > \n" +
               body.gsub(/^/, " > ")
    end
  end

  def forward
    Message.new do |r|
      r.to = from
      r.subject = "FW: #{subject}"
      r.body = "\n\n\n" +
               "---------- Forwarded message ----------\n" +
               " > From: #{from.username}\n" +
               " > To: #{to.username}\n" +
               " > Sent: #{created_at}\n" +
               " > Subject: #{subject}\n" +
               " > \n" +
               body.gsub(/^/, " > ")
    end
  end
end
