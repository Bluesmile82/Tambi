class Graph < ActiveRecord::Base
  has_many :ideas, dependent: :destroy
  belongs_to :user
end
