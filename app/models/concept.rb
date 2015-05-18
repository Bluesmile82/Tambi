class Concept < ActiveRecord::Base
  has_many :ideas
  has_many :matches, foreign_key: "concept_a_id", dependent: :destroy

  has_many :concept_bs, through: :matches, source: :concept_b
  has_many :reverse_links, foreign_key: "concept_b_id",
              class_name: "Match", dependent: :destroy
  has_many :concept_as, through: :reverse_links, source: :concept_a

  def match!(concept_b, user)
    self.matches.create(concept_a_id: id, concept_b_id: concept_b.id, user_id: user.id)
  end
end
