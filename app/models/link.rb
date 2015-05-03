class Link < ActiveRecord::Base
  belongs_to :idea_a, class_name: "Idea"
  belongs_to :idea_b, class_name: "Idea"
end
