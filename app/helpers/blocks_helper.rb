module BlocksHelper
  def blocks?
    @blocks && @blocks.any?
  end
end
