module UIUtil
 def nl2br(string)
    return "" unless string
    string.gsub("\n", "<br>").html_safe
  end

  def blank_sign(text="(blank)")
    content_tag("span", text, :class=>"blank_sign")
  end
end