class MatchesController < ApplicationController

  def create
    @concept_a = Concept.find(params[:match][:concept_a_id])
    @concept_b = Concept.find(params[:match][:concept_b_id])
    @match = @concept_a.match!(@concept_b)
  end
end