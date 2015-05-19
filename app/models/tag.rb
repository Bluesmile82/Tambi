class Tag < ActiveRecord::Base
  belongs_to :concept
  belongs_to :idea
  belongs_to :user
end
