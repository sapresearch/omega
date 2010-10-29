require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test "lost_username" do
    mail = UserMailer.lost_username
    assert_equal "Lost username", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "lost_password" do
    mail = UserMailer.lost_password
    assert_equal "Lost password", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
