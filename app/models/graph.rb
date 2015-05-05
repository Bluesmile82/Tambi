class Graph < ActiveRecord::Base
  has_many :ideas, dependent: :destroy
end
