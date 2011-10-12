require 'set'

class Array

  # based on induction and DP
  def to_combinations(n=2)
    return Set.new(self.to_set) if n==self.length
    return nil if n<1 || n>self.length
    
    result = Set.new
    if n==1
      self.each{|e| result << [e].to_set}
    elsif n==2
      (0...self.length).each do |i|
        ((i+1)...self.length).each do |j|
          result << [self[i],self[j]].to_set
        end
      end
    else
      sub = self.take(self.length-1)
      result = sub.to_combinations(n-1).map{|s|s<<self.last}.merge(sub.to_combinations(n))
    end
    result
  end
  
end