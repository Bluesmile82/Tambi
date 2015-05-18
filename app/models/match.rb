class Match < ActiveRecord::Base
  belongs_to :concept_a, class_name: "Concept"
  belongs_to :concept_b, class_name: "Concept"
  belongs_to :user
end
