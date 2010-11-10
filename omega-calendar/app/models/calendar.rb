class Calendar < Omega::Model

  has_many :events, :dependent => :destroy

end
