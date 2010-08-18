class CreateContactForEachUser < ActiveRecord::Migration
  def self.up
    User.all.each do |u|
      Contact.new do |c|
        c.user = u
      end.save(:validate => false)
    end
  end

  def self.down
    User.all.each do |u|
      Contact.for(u).try(:destroy)
    end
  end
end
