class Concept < ActiveRecord::Base
  belongs_to :ideas, :inverse_of => :concept
end
