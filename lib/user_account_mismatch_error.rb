class UserAccountMismatchError < StandardError
  def initialize
    super("User is not in Account")
  end
end