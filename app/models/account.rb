  class Account < ActiveRecord::Base

	validates :name, :uniqueness => true
		
    class << self
      def current
        Thread.current[:omega_hosting_account]
      end

      def current=(account)
        Thread.current[:omega_hosting_account] = account
      end
    end

    def with
      previous, Account.current = Account.current, self
      yield
    ensure
      Account.current = previous
    end
  end