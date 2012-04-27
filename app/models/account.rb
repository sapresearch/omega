class Account < ActiveRecord::Base

	require 'user_account_mismatch_error'
	validates :name, :uniqueness => true
	has_many :users
	has_many :permissions
	has_many :roles
		
    class << self
      def current
        Thread.current[:account]
      end

      def current=(account)
        Thread.current[:account] = account
      end
    end

    def with(session)
      previous, Account.current = Account.current, self
	  current_user = current_user(session)
	  if Account.current.has_user?(current_user)
		yield
	  end
    ensure
      Account.current = previous
    end
	
	def has_user?(user)
		if not user.is_anonymous?
			has_user = user.account == self
		elsif user.is_anonymous?
			has_user = true
		end
		has_user
	end
	
	def current_user(session)
        current_user = begin
          if session[:user_id]
            user = User.find_by_id(session[:user_id])
			# If the session hash has a user_id, but the user couldn't be found, then the user is probably from another account.
			raise UserAccountMismatchError.new if user.nil?
			user
          else
            User.anonymous
          end
        end
    end
	  
  end
