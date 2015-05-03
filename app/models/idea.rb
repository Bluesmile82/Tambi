class Idea < ActiveRecord::Base
  has_many :links
  has_one :concept
end
