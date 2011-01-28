class Contact
  class UserObserver < ActiveRecord::Observer
    observe :user

    def after_save(user)
      return unless Contact.table_exists?

      ensure_user_has_contact(user)
      sync_user_with_contact(user)
    end

    private
      def ensure_user_has_contact(user)
        unless Contact.for(user)
          Contact.new do |c|
            c.user = user
          end.save(:validate => false)
        end
      end

      def sync_user_with_contact(user)
        contact = Contact.for(user)
        contact.sync_from_user unless contact.synced?
      end
  end
end

