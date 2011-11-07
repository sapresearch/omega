module Group::ThreadsHelper
  def get_replies(thread)
    thread.posts.count
  end
  def last_thread(thread)
    thread.posts.last
  end
end
