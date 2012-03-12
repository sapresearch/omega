	class Contact::GroupPosition < Model
	  belongs_to :contact
	  belongs_to :group
	
	  validates :contact_id, :group_id, :presence => true,
	                                    :uniqueness => { :scope => [:contact_id,:group_id], :message => 'already in this group' }
	end
